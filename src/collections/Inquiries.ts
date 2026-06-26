import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'type', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact Form', value: 'contact' },
        { label: 'Wholesale Inquiry', value: 'wholesale' },
      ],
    },
    {
      name: 'fullName',
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
      name: 'businessName',
      type: 'text',
      admin: {
        description: 'Applicable for wholesale requests',
      },
    },
    {
      name: 'subject',
      type: 'text',
      admin: {
        description: 'Applicable for contact requests',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'product',
      type: 'text',
      admin: {
        description: 'Interested product size/type for wholesale',
      },
    },
    {
      name: 'quantity',
      type: 'text',
      admin: {
        description: 'Estimated quantity requested',
      },
    },
    {
      name: 'purpose',
      type: 'text',
      admin: {
        description: 'Purpose for wholesale purchase',
      },
    },
    {
      name: 'deliveryOption',
      type: 'text',
      admin: {
        description: 'Pickup or Delivery preference',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      admin: {
        description: 'Delivery address if applicable',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Responded', value: 'responded' },
        { label: 'Closed', value: 'closed' },
      ],
    },
  ],
}
