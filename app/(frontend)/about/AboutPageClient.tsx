'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import Button from '../../components/Button'

interface AboutPageData {
  pageTitle?: string
  pageSubtitle?: string
  storyTitle?: string
  storyParagraphs?: { text: string }[]
  stats?: {
    yearsExperience?: string
    yearsLabel?: string
    projectsCompleted?: string
    projectsLabel?: string
    happyClients?: string
    clientsLabel?: string
  }
  values?: { title: string; description: string; icon: string }[]
  ctaTitle?: string
  ctaText?: string
  ctaButtonText?: string
  ctaButtonLink?: string
}

const QualityIcon = () => (
  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
)

const ClockIcon = () => (
  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const PeopleIcon = () => (
  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
)

const iconMap: Record<string, React.ReactNode> = {
  quality: <QualityIcon />,
  clock: <ClockIcon />,
  people: <PeopleIcon />,
}

export const AboutPageClient = ({ initialData }: { initialData: AboutPageData | null }) => {
  const serverURL = typeof window !== 'undefined' ? window.location.origin : ''
  const { data } = useLivePreview<AboutPageData>({
    apiRoute: '/api/globals/about-page',
    depth: 2,
    initialData: initialData || {},
    serverURL,
  })

  const pageTitle = data?.pageTitle || 'About Us'
  const pageSubtitle = data?.pageSubtitle || 'Your trusted partner for all printing and signage needs.'
  const storyTitle = data?.storyTitle || 'Our Story'
  const storyParagraphs = data?.storyParagraphs || []
  const stats = data?.stats || {}
  const values = data?.values || []
  const ctaTitle = data?.ctaTitle || 'Ready to Work Together?'
  const ctaText = data?.ctaText || "Let's discuss your project and see how we can help bring your vision to life."
  const ctaButtonText = data?.ctaButtonText || 'Contact Us Today'
  const ctaButtonLink = data?.ctaButtonLink || '/contact'

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-extrabold uppercase tracking-tight md:text-5xl">{pageTitle}</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-300">{pageSubtitle}</p>
      </div>

      <div className="mb-20 grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold">{storyTitle}</h2>
          {storyParagraphs.map((para, index) => (
            <p key={index} className="mb-4 text-gray-300">
              {para.text}
            </p>
          ))}
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-pink-500 p-1">
          <div className="rounded-2xl bg-[#1a2b4b] p-8">
            <div className="text-center">
              <div className="mb-2 text-6xl font-extrabold text-pink-500">{stats.yearsExperience || '10+'}</div>
              <div className="text-gray-300">{stats.yearsLabel || 'Years of Experience'}</div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">{stats.projectsCompleted || '5000+'}</div>
                <div className="text-sm text-gray-400">{stats.projectsLabel || 'Projects Completed'}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">{stats.happyClients || '1000+'}</div>
                <div className="text-sm text-gray-400">{stats.clientsLabel || 'Happy Clients'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl bg-[#0f1a2e] p-8 text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-pink-500">
                {iconMap[value.icon] || <QualityIcon />}
              </div>
              <h3 className="mb-4 text-xl font-bold">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-pink-500 p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">{ctaTitle}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-100">{ctaText}</p>
        <Button href={ctaButtonLink} variant="secondary">
          {ctaButtonText}
        </Button>
      </div>
    </div>
  )
}

