'use client'

import React, { useEffect, useMemo, useState } from 'react'
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
  installationSection?: {
    title?: string
    description?: string
    projects?: Array<{
      eyebrow?: string
      title?: string
      category?: string
      image?: MediaValue | string
    }>
  }
}

type HeroImage = {
  image?: MediaValue | string
  imageUrl?: string
  externalUrl?: string
  alt?: string
}

type ResolvableImage = HeroImage | MediaValue | string

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

const resolveImageUrl = (imageValue?: ResolvableImage) => {
  if (!imageValue) return ''
  if (typeof imageValue === 'string') return imageValue
  if ('imageUrl' in imageValue && imageValue.imageUrl) return imageValue.imageUrl
  if ('externalUrl' in imageValue && imageValue.externalUrl) return imageValue.externalUrl
  if ('image' in imageValue) {
    if (typeof imageValue.image === 'string') return imageValue.image
    if (imageValue.image?.cloudinaryUrl) return imageValue.image.cloudinaryUrl
    if (imageValue.image?.secure_url) return imageValue.image.secure_url
    if (imageValue.image?.url) return imageValue.image.url
  }
  const mediaValue = imageValue as MediaValue
  if (mediaValue.cloudinaryUrl) return mediaValue.cloudinaryUrl
  if (mediaValue.secure_url) return mediaValue.secure_url
  if (mediaValue.url) return mediaValue.url
  return ''
}

export const HomePageClient = ({ initialData }: { initialData: HomePageData | null }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const serverURL = typeof window !== 'undefined' ? window.location.origin : ''
  const { data } = useLivePreview<HomePageData>({
    apiRoute: '/api/globals/home-page',
    depth: 2,
    initialData: initialData || {},
    serverURL,
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const heroImages = data?.heroImages || []
  const headline = data?.headline || 'YOUR ONE STOP PRINTING SHOP.'
  const subheadline =
    data?.subheadline ||
    'From custom vinyl stickers to massive industrial signage, we provide the mounting and precision your business deserves.'
  const serviceCards = data?.serviceCards || []
  const installationTitle = data?.installationSection?.title || 'Precision Installation'
  const installationDescription =
    data?.installationSection?.description ||
    "We don't just print — we mount. Our team handles professional application on glass, metal, and wood."
  const installationProjects = useMemo(() => {
    const cmsProjects = data?.installationSection?.projects || []

    if (cmsProjects.length > 0) {
      return cmsProjects.map((project, index) => ({
        eyebrow: project.eyebrow || 'Signage project',
        title: project.title || `Project 0${index + 1}`,
        category: project.category || 'Business Branding',
        image: project.image || heroImages[index % (heroImages.length || 1)],
      }))
    }

    return Array.from({ length: 4 }, (_, index) => ({
      eyebrow: 'Signage project',
      title: `Project 0${index + 1}`,
      category: 'Business Branding',
      image: heroImages[index % (heroImages.length || 1)],
    }))
  }, [data?.installationSection?.projects, heroImages])

  return (
    <div className="overflow-x-hidden">
      <style jsx>{`
        @keyframes headline-bounce {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          15% {
            transform: translateY(-14px) scale(1.03);
          }
          35% {
            transform: translateY(0) scale(1);
          }
          55% {
            transform: translateY(-7px) scale(1.015);
          }
          75% {
            transform: translateY(0) scale(1);
          }
        }

        .headline-bounce {
          animation: headline-bounce 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
          display: inline-block;
          transform-origin: center bottom;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:pt-28">
        <section className="mb-16 text-center">
          <div
            className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <span className="mb-8 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-blue-600">
              Premium Printing & Mounting
            </span>
          </div>

          <h1
            className={`mb-8 text-5xl font-black uppercase leading-[0.9] tracking-tight text-blue-900 transition-all duration-1000 delay-150 md:text-8xl ${
              isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            <span className="headline-bounce bg-gradient-to-r from-blue-600 via-blue-500 to-pink-500 bg-clip-text text-transparent">
              {headline.includes('PRINTING SHOP') ? (
                <>
                  YOUR ONE STOP <br />
                  PRINTING SHOP.
                </>
              ) : (
                headline
              )}
            </span>
          </h1>

          <p
            className={`mx-auto mb-12 max-w-2xl text-xl text-slate-500 transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {subheadline}
          </p>
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

        <section className="mb-24">
          <div className="mb-8 flex items-end justify-between gap-6">
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

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-xl">
            <h2 className="mb-4 text-4xl font-black uppercase text-blue-900">{installationTitle}</h2>
            <p className="text-lg text-slate-500">{installationDescription}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {installationProjects.map((project, index) => {
              const imageUrl = project.image ? resolveImageUrl(project.image) : ''

              return (
                <div
                  key={project.title}
                  className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white shadow-sm"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Signage project"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-blue-100 via-white to-pink-100" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-900/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                    <p className="mb-1 text-xs font-black uppercase tracking-[0.25em]">{project.eyebrow}</p>
                    <p className="mb-1 text-xl font-black uppercase">{project.title}</p>
                    <p className="font-bold text-white/90">{project.category}</p>
                  </div>

                  <div
                    className={`absolute right-5 top-5 h-3 w-3 rounded-full ${index % 2 === 0 ? 'bg-pink-400' : 'bg-blue-300'}`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
