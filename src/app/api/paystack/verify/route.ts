import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'
import { createFezOrderForPaidOrder } from '@/lib/fulfillment'
import { verifyPaystackTransaction } from '@/lib/paystack'

type OrderDoc = {
  id: string
  orderNumber: string
  total: number
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get('reference') || ''
    const orderNumber = searchParams.get('orderNumber') || ''

    if (!reference || !orderNumber) {
      return NextResponse.json({ error: 'Reference and order number are required' }, { status: 400 })
    }

    const verification = await verifyPaystackTransaction(reference)
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'orders',
      where: {
        orderNumber: {
          equals: orderNumber,
        },
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    const order = result.docs[0] as OrderDoc | undefined
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const expectedAmount = Math.round(order.total * 100) / 100
    const receivedAmount = Math.round(verification.amount * 100) / 100
    const isPaid =
      verification.status === 'success' &&
      verification.currency === 'NGN' &&
      receivedAmount >= expectedAmount

    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        paymentStatus: isPaid ? 'paid' : 'failed',
        paystackReference: verification.reference,
        paidAt: isPaid ? verification.paidAt : undefined,
        status: isPaid ? 'processing' : 'pending',
      },
      overrideAccess: true,
    })

    if (isPaid) {
      await createFezOrderForPaidOrder(payload, order.id)
    }

    return NextResponse.json({
      paid: isPaid,
      status: verification.status,
      orderNumber,
      reference: verification.reference,
    })
  } catch (err) {
    console.error('Paystack verification failed:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unable to verify payment' },
      { status: 500 },
    )
  }
}
