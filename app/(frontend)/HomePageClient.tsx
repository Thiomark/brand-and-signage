'use client'

import React from 'react'
import Image from 'next/image'
import { useLivePreview } from '@payloadcms/live-preview-react'
import ServiceCard from '../components/ServiceCard'

interface MediaValue {
  url?: string
  cloudinaryUrl?: string
  secure_url?: string
}

interface HomePageData {
  heroImages?: Array<{
    image?: MediaValue | string
    imageUrl?: string
    externalUrl?: string
    alt?: string
  }>
  headline?: string
  subheadline?: string
  serviceCards?: Array<{
    icon: string
    title: string
    description: string
    variant: 'blue' | 'pink'
  }>
}

type HeroImage = {
  image?: MediaValue | string
  imageUrl?: string
  externalUrl?: string
  alt?: string
}

const PrinterIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
    />
  </svg>
)

const StickerIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 7h10M7 12h10m-10 5h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
    />
  </svg>
)

const BuildingIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
)

const iconMap: Record<string, React.ReactNode> = {
  printer: <PrinterIcon />,
  sticker: <StickerIcon />,
  building: <BuildingIcon />,
}

const resolveImageUrl = (heroImage: HeroImage) => {
  if (heroImage.imageUrl) return heroImage.imageUrl
  if (heroImage.externalUrl) return heroImage.externalUrl
  if (typeof heroImage.image === 'string') return heroImage.image
  if (heroImage.image?.cloudinaryUrl) return heroImage.image.cloudinaryUrl
  if (heroImage.image?.secure_url) return heroImage.image.secure_url
  if (heroImage.image?.url) return heroImage.image.url
  return ''
}

export const HomePageClient = ({ initialData }: { initialData: HomePageData | null }) => {
  const serverURL = typeof window !== 'undefined' ? window.location.origin : ''
  const { data } = useLivePreview<HomePageData>({
    apiRoute: '/api/globals/home-page',
    depth: 2,
    initialData: initialData || {},
    serverURL,
  })

  const heroImages = data?.heroImages || []
  const headline = data?.headline || 'Your Visual Identity, Brought to Life'
  const subheadline = data?.subheadline || 'Copies, Stickers, Mounted Prints & Business Signage'
  const serviceCards = data?.serviceCards || []

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-12">
      <section className="mb-20 text-center">
        <span className="mb-6 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-blue-600">
          Premium Printing & Mounting
        </span>
        <h1 className="mb-5 text-4xl font-black uppercase leading-[0.9] tracking-tight text-blue-900 md:text-7xl">
          {headline}
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-500 md:text-xl">{subheadline}</p>
      </section>

      <section className="mb-16 grid gap-6 md:grid-cols-2">
        {heroImages.slice(0, 2).map((heroImage, index) => (
          <div key={index} className="group relative h-80 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
            <Image
              src={resolveImageUrl(heroImage)}
              alt={heroImage.alt || 'Hero image'}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ))}
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-black uppercase tracking-tight text-blue-900">Core Services</h2>
          <a href="/services" className="text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-pink-500">
            View all
          </a>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {serviceCards.map((card, index) => (
            <ServiceCard
              key={index}
              icon={iconMap[card.icon] || <PrinterIcon />}
              title={card.title}
              description={card.description}
              variant={card.variant}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
