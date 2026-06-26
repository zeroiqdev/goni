import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'
import { createFezOrderForPaidOrder } from '@/lib/fulfillment'

type PaystackWebhook = {
  event?: string
  data?: {
    reference?: string
    status?: string
    amount?: number
    currency?: string
    paid_at?: string
    metadata?: {
      orderNumber?: string
    }
  }
}

async function updateOrderFromCharge(event: PaystackWebhook) {
  const reference = event.data?.reference
  const orderNumber = event.data?.metadata?.orderNumber
  if (!reference && !orderNumber) return

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'orders',
    where: orderNumber
      ? {
          orderNumber: {
            equals: orderNumber,
          },
        }
      : {
          paystackReference: {
            equals: reference,
          },
        },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const order = result.docs[0]
  if (!order) return

  const isPaid = event.event === 'charge.success' && event.data?.status === 'success'

  await payload.update({
    collection: 'orders',
    id: order.id,
    data: {
      paymentStatus: isPaid ? 'paid' : 'failed',
      paystackReference: reference,
      paidAt: isPaid ? event.data?.paid_at : undefined,
      status: isPaid ? 'processing' : 'pending',
    },
    overrideAccess: true,
  })

  if (isPaid) {
    await createFezOrderForPaidOrder(payload, String(order.id))
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-paystack-signature')
  const secret = process.env.PAYSTACK_SECRET_KEY

  if (!secret) {
    console.error('Paystack webhook received but PAYSTACK_SECRET_KEY is not configured')
    return NextResponse.json({ received: true })
  }

  const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex')
  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
  }

  try {
    const event = JSON.parse(rawBody) as PaystackWebhook

    if (event.event === 'charge.success') {
      await updateOrderFromCharge(event)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Paystack webhook handling failed:', err)
    return NextResponse.json({ received: true })
  }
}
