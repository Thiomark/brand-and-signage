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
    {
      name: 'installationSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Precision Installation',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            "We don't just print — we mount. Our team handles professional application on glass, metal, and wood.",
        },
        {
          name: 'projects',
          type: 'array',
          maxRows: 4,
          admin: {
            description: 'Manage the project cards shown in the Precision Installation section.',
          },
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              defaultValue: 'Signage project',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'category',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Upload or select the image for this project card.',
              },
            },
          ],
          defaultValue: [
            {
              eyebrow: 'Signage project',
              title: 'Project 01',
              category: 'Business Branding',
            },
            {
              eyebrow: 'Signage project',
              title: 'Project 02',
              category: 'Business Branding',
            },
            {
              eyebrow: 'Signage project',
              title: 'Project 03',
              category: 'Business Branding',
            },
            {
              eyebrow: 'Signage project',
              title: 'Project 04',
              category: 'Business Branding',
            },
          ],
        },
      ],
    },
  ],
}
