import type { CollectionConfig } from 'payload'
import {
  fetchFezDeliveryCost,
  isNigeria,
  parseWeightKg,
} from '@/lib/delivery'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.items && Array.isArray(data.items)) {
          let calculatedTotal = 0;
          let totalWeightKg = 0;

          for (const item of data.items) {
            if (!item.product) {
              throw new Error('Every order item must reference a product before checkout.');
            }

            try {
              const productId =
                typeof item.product === 'object' && item.product !== null
                  ? item.product.id
                  : item.product;

              const product = await req.payload.findByID({
                collection: 'products',
                id: productId,
              });
              if (product) {
                // Ensure client price matches actual DB price
                item.price = product.price;
                const quantity = item.quantity || 1;
                calculatedTotal += product.price * quantity;
                totalWeightKg += parseWeightKg(product.weight) * quantity;
              } else {
                throw new Error(`Product ${productId} was not found.`);
              }
            } catch (err) {
              console.error(`Error validating product price for ID ${item.product}:`, err);
              throw new Error('Could not validate product prices before checkout.');
            }
          }

          const customer = data.customer || {};
          let shippingFee = 0;

          if (isNigeria(customer.country)) {
            const deliveryCost = await fetchFezDeliveryCost({
              state: customer.state,
              weight: totalWeightKg,
            });
            shippingFee = deliveryCost.fee;
          } else {
            throw new Error('Delivery cost calculation is currently available for Nigeria orders only.');
          }

          data.subtotal = calculatedTotal * 0.925;
          data.vat = calculatedTotal * 0.075;
          data.shippingFee = shippingFee;
          data.total = calculatedTotal + shippingFee;
        }
        return data;
      },
    ],
  },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'createdAt', 'total', 'status'],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'The registered customer who placed this order.',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'customer',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'deliveryAddress',
      type: 'group',
      admin: {
        description: 'Snapshot of the delivery address used for this order.',
      },
      fields: [
        {
          name: 'country',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'streetAddress',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'subtotal',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'vat',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'shippingFee',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'fezOrderNo',
      type: 'text',
      admin: {
        description: 'Fez Delivery order or mock reference generated during checkout.',
      },
    },
    {
      name: 'fezDeliveryStatus',
      type: 'text',
      admin: {
        description: 'Latest delivery status received from Fez webhook.',
      },
    },
    {
      name: 'fezWebhookPayload',
      type: 'textarea',
      admin: {
        description: 'Last raw Fez webhook payload for debugging delivery callbacks.',
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'unpaid',
      options: [
        { label: 'Unpaid', value: 'unpaid' },
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      name: 'paystackReference',
      type: 'text',
    },
    {
      name: 'paidAt',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
  ],
}
