import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroImages',
      type: 'array',
      maxRows: 2,
      fields: [
        {
          name: 'imageUrl',
          type: 'text',
          required: true,
          admin: {
            description: 'Image URL (can be Cloudinary or external URL)',
          },
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        {
          imageUrl: 'https://images.pexels.com/photos/14602294/pexels-photo-14602294.jpeg',
          alt: 'Stickers and Prints',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d',
          alt: 'Neon Signage',
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
