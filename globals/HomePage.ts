import type { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '@/lib/revalidate'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      name: 'heroImages',
      type: 'array',
      maxRows: 2,
      admin: {
        description: 'Select hero images from the Media library',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Select an image from the Media library',
          },
        },
      ],
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Your Visual Identity, Brought to Life',
    },
    {
      name: 'subheadline',
      type: 'text',
      defaultValue: 'Copies, Stickers, Mounted Prints & Business Signage',
    },
    {
      name: 'serviceCards',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Printer', value: 'printer' },
            { label: 'Sticker', value: 'sticker' },
            { label: 'Building', value: 'building' },
          ],
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'variant',
          type: 'select',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Pink', value: 'pink' },
          ],
          defaultValue: 'blue',
        },
      ],
      defaultValue: [
        {
          icon: 'printer',
          title: 'Copies & Prints',
          description: 'High-quality document reproduction & large-format printing',
          variant: 'blue',
        },
        {
          icon: 'sticker',
          title: 'Custom Stickers',
          description: 'Die-cut, waterproof, and durable stickers for any purpose',
          variant: 'pink',
        },
        {
          icon: 'building',
          title: 'Business Signage',
          description: 'Indoor & outdoor signs, banners, and display solutions',
          variant: 'blue',
        },
      ],
    },
  ],
}
