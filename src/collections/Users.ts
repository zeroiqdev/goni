import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Allow public registration
    create: () => true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.firstName || data?.lastName) {
              return [data.firstName, data.lastName].filter(Boolean).join(' ')
            }
          },
        ],
      },
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'customer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
      admin: {
        hidden: true,
      },
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'country',
          type: 'text',
          defaultValue: 'Nigeria',
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
      name: 'stripeCustomerID',
      type: 'number',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'skipSync',
      type: 'checkbox',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'cart',
      type: 'group',
      fields: [
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'variantID',
              type: 'text',
            },
            {
              name: 'variant',
              type: 'text',
            },
            {
              name: 'unitPrice',
              type: 'number',
              required: true,
            },
            {
              name: 'quantity',
              type: 'number',
              required: true,
              min: 0,
            },
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
      ],
      admin: {
        hidden: true,
      },
    },
  ],
}
