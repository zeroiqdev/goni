import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'
import { initializePaystackTransaction } from '@/lib/paystack'

type OrderDoc = {
  id: string
  orderNumber: string
  total: number
  shippingFee?: number
  customer?: {
    email?: string
    name?: string
    phone?: string
  }
}

function getAppBaseUrl(request: Request) {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    `${new URL(request.url).protocol}//${new URL(request.url).host}`
  ).replace(/\/$/, '')
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { orderNumber?: string }
    const orderNumber = body.orderNumber?.trim()

    if (!orderNumber) {
      return NextResponse.json({ error: 'Order number is required' }, { status: 400 })
    }

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

    if (!order.customer?.email) {
      return NextResponse.json({ error: 'Order customer email is required for payment' }, { status: 400 })
    }

    if (!Number.isFinite(order.shippingFee) || Number(order.shippingFee) <= 0) {
      return NextResponse.json(
        { error: 'Delivery cost must be calculated before payment can start' },
        { status: 400 },
      )
    }

    const reference = `${order.orderNumber}-${Date.now()}`
    const baseUrl = getAppBaseUrl(request)
    const callbackUrl = `${baseUrl}/payment/verify?reference=${encodeURIComponent(reference)}&orderNumber=${encodeURIComponent(order.orderNumber)}`

    const transaction = await initializePaystackTransaction({
      amount: order.total,
      email: order.customer.email,
      reference,
      callbackUrl,
      metadata: {
        orderNumber: order.orderNumber,
        customerName: order.customer.name,
        customerPhone: order.customer.phone,
      },
    })

    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        paymentStatus: 'pending',
        paystackReference: transaction.reference,
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      authorizationUrl: transaction.authorizationUrl,
      reference: transaction.reference,
    })
  } catch (err) {
    console.error('Paystack initialization failed:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unable to initialize payment' },
      { status: 500 },
    )
  }
}
