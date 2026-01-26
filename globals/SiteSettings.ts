import type { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '@/lib/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Brand and Signage',
    },
    {
      name: 'siteTagline',
      type: 'text',
      defaultValue: 'Copies, Stickers, Mounted Prints & Business Signage',
    },
    {
      name: 'logoUrl',
      type: 'text',
      admin: {
        description: 'Logo image URL (optional)',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          defaultValue: 'https://facebook.com',
        },
        {
          name: 'twitter',
          type: 'text',
          defaultValue: 'https://twitter.com',
        },
        {
          name: 'instagram',
          type: 'text',
          defaultValue: 'https://instagram.com',
        },
      ],
    },
    {
      name: 'footerText',
      type: 'text',
      defaultValue: '© 2026 BRAND AND SIGNAGE. All rights reserved.',
    },
    {
      name: 'navLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { label: 'Services', href: '/services' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],
}
