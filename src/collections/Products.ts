import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'inStock', 'featured'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly slug (e.g. goni-raw-shea-butter-500g)',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Short descriptive subtitle (e.g. Perfect for Personal Use)',
      },
    },
    {
      name: 'isWholesale',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check this if the product is for wholesale quote request only',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'compareAtPrice',
      type: 'number',
      admin: {
        description: 'Original price to show a discount (optional)',
      },
    },
    {
      name: 'weight',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g. 500g, 1kg, 15kg bucket',
      },
    },
    {
      name: 'cardWeightLabel',
      type: 'text',
      admin: {
        description: 'Optional display text for the shop product card only. Leave blank to use the weight field.',
        placeholder: 'e.g. 2 pieces, 0.25kg, 200g jar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this product on the home page',
      },
    },
    {
      name: 'ingredients',
      type: 'richText',
      admin: {
        description: 'Ingredients list for this product',
      },
    },
    {
      name: 'howToUse',
      type: 'richText',
      admin: {
        description: 'How to use instructions for this product',
      },
    },
    {
      name: 'shippingAndDelivery',
      type: 'richText',
      admin: {
        description: 'Shipping & Delivery information for this product',
      },
    },
    {
      name: 'returnAndRefunds',
      type: 'richText',
      admin: {
        description: 'Return & Refunds policy for this product',
      },
    },
  ],
}
