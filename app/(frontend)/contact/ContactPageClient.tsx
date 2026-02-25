'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import ContactForm from './ContactForm'

interface ContactPageData {
  pageTitle?: string
  pageSubtitle?: string
  formTitle?: string
  contactInfoTitle?: string
  address?: {
    street?: string
    city?: string
    country?: string
  }
  phone?: string
  email?: string
  businessHoursTitle?: string
  businessHours?: {
    days: string
    hours: string
    isClosed?: boolean
  }[]
  serviceOptions?: {
    value: string
    label: string
  }[]
}

export const ContactPageClient = ({ initialData }: { initialData: ContactPageData | null }) => {
  const serverURL = typeof window !== 'undefined' ? window.location.origin : ''
  const { data } = useLivePreview<ContactPageData>({
    apiRoute: '/api/globals/contact-page',
    depth: 2,
    initialData: initialData || {},
    serverURL,
  })

  const pageTitle = data?.pageTitle ?? 'Contact Us'
  const pageSubtitle =
    data?.pageSubtitle ?? 'Get in touch with us for a free quote or any questions about our services.'
  const formTitle = data?.formTitle ?? 'Send Us a Message'
  const contactInfoTitle = data?.contactInfoTitle ?? 'Get In Touch'
  const address = {
    street: data?.address?.street ?? '123 Print Street',
    city: data?.address?.city ?? 'Johannesburg, GP 2000',
    country: data?.address?.country ?? 'South Africa',
  }
  const phone = data?.phone ?? '+27 11 123 4567'
  const email = data?.email ?? 'info@brandandsignage.co.za'
  const businessHoursTitle = data?.businessHoursTitle ?? 'Business Hours'
  const businessHours = data?.businessHours?.length
    ? data.businessHours
    : [
        { days: 'Monday - Friday', hours: '08:00 - 17:00', isClosed: false },
        { days: 'Saturday', hours: '09:00 - 13:00', isClosed: false },
        { days: 'Sunday', hours: 'Closed', isClosed: true },
      ]
  const serviceOptions = data?.serviceOptions?.length
    ? data.serviceOptions
    : [
        { value: 'copies-prints', label: 'Copies & Prints' },
        { value: 'custom-stickers', label: 'Custom Stickers' },
        { value: 'business-signage', label: 'Business Signage' },
        { value: 'other', label: 'Other' },
      ]

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-extrabold uppercase tracking-tight md:text-5xl">{pageTitle}</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-300">{pageSubtitle}</p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="rounded-2xl bg-[#0f1a2e] p-8">
          <h2 className="mb-6 text-2xl font-bold">{formTitle}</h2>
          <ContactForm serviceOptions={serviceOptions} />
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-pink-500 p-8">
            <h2 className="mb-6 text-2xl font-bold">{contactInfoTitle}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold">Address</h3>
                <p className="text-gray-100">
                  {address.street}
                  <br />
                  {address.city}
                  <br />
                  {address.country}
                </p>
              </div>
              <div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-gray-100">{phone}</p>
              </div>
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-gray-100">{email}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#0f1a2e] p-8">
            <h2 className="mb-6 text-2xl font-bold">{businessHoursTitle}</h2>
            <div className="space-y-3">
              {businessHours.map((item) => (
                <div key={item.days} className="flex justify-between">
                  <span className="text-gray-400">{item.days}</span>
                  <span className={item.isClosed ? 'text-pink-400' : ''}>{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

