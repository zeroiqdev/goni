import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../../payload.config'

type FezWebhookPayload = Record<string, unknown>

function getString(value: unknown) {
  return typeof value === 'string' ? value : undefined
}

function getFezReference(payload: FezWebhookPayload) {
  return (
    getString(payload.orderNo) ||
    getString(payload.order_no) ||
    getString(payload.waybillNumber) ||
    getString(payload.waybill_number) ||
    getString(payload.waybill) ||
    getString(payload.reference)
  )
}

function getFezStatus(payload: FezWebhookPayload) {
  return (
    getString(payload.status) ||
    getString(payload.deliveryStatus) ||
    getString(payload.delivery_status) ||
    getString(payload.event)
  )
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FezWebhookPayload
    const fezReference = getFezReference(body)
    const fezStatus = getFezStatus(body)

    if (fezReference) {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'orders',
        where: {
          fezOrderNo: {
            equals: fezReference,
          },
        },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })

      const order = result.docs[0]
      if (order) {
        await payload.update({
          collection: 'orders',
          id: order.id,
          data: {
            fezDeliveryStatus: fezStatus,
            fezWebhookPayload: JSON.stringify(body),
          },
          overrideAccess: true,
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Fez webhook handling failed:', err)
    return NextResponse.json({ received: true })
  }
}
