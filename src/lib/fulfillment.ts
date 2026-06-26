import { createFezOrder, isNigeria, parseWeightKg } from '@/lib/delivery'

type PayloadLike = {
  findByID: (args: {
    collection: 'orders'
    id: string
    depth?: number
    overrideAccess?: boolean
  }) => Promise<any>
  update: (args: {
    collection: 'orders'
    id: string
    data: Record<string, unknown>
    overrideAccess?: boolean
  }) => Promise<any>
}

export async function createFezOrderForPaidOrder(payload: PayloadLike, orderID: string) {
  const order = await payload.findByID({
    collection: 'orders',
    id: orderID,
    depth: 1,
    overrideAccess: true,
  })

  if (!order || order.fezOrderNo || !isNigeria(order.customer?.country)) return

  let valueOfItem = 0
  let weight = 0
  const descriptions: string[] = []

  for (const item of order.items || []) {
    const quantity = item.quantity || 1
    valueOfItem += (item.price || 0) * quantity

    if (item.product && typeof item.product === 'object') {
      weight += parseWeightKg(item.product.weight) * quantity
      descriptions.push(`${quantity} x ${item.product.title}`)
    }
  }

  const fezOrderNo = await createFezOrder({
    orderNumber: order.orderNumber,
    customer: order.customer,
    valueOfItem,
    weight,
    itemDescription: descriptions.join(', ') || 'Goni order',
  })

  await payload.update({
    collection: 'orders',
    id: order.id,
    data: {
      fezOrderNo,
    },
    overrideAccess: true,
  })
}
