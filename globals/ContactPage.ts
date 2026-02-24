import type { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '@/lib/revalidate'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      required: true,
      defaultValue: 'Contact Us',
    },
    {
      name: 'pageSubtitle',
      type: 'text',
      defaultValue: 'Get in touch with us for a free quote or any questions about our services.',
    },
    {
      name: 'formTitle',
      type: 'text',
      defaultValue: 'Send Us a Message',
    },
    {
      name: 'contactInfoTitle',
      type: 'text',
      defaultValue: 'Get In Touch',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          defaultValue: '123 Print Street',
        },
        {
          name: 'city',
          type: 'text',
          defaultValue: 'Johannesburg, GP 2000',
        },
        {
          name: 'country',
          type: 'text',
          defaultValue: 'South Africa',
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+27 11 123 4567',
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'info@brandandsignage.co.za',
    },
    {
      name: 'businessHoursTitle',
      type: 'text',
      defaultValue: 'Business Hours',
    },
    {
      name: 'businessHours',
      type: 'array',
      fields: [
        {
          name: 'days',
          type: 'text',
          required: true,
        },
        {
          name: 'hours',
          type: 'text',
          required: true,
        },
        {
          name: 'isClosed',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
      defaultValue: [
        { days: 'Monday - Friday', hours: '08:00 - 17:00', isClosed: false },
        { days: 'Saturday', hours: '09:00 - 13:00', isClosed: false },
        { days: 'Sunday', hours: 'Closed', isClosed: true },
      ],
    },
    {
      name: 'serviceOptions',
      type: 'array',
      admin: {
        description: 'Options for the service dropdown in the contact form',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { value: 'copies-prints', label: 'Copies & Prints' },
        { value: 'custom-stickers', label: 'Custom Stickers' },
        { value: 'business-signage', label: 'Business Signage' },
        { value: 'other', label: 'Other' },
      ],
    },
  ],
}
