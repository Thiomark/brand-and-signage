import { draftMode } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { AboutPageClient } from './AboutPageClient'

export const revalidate = 60

const AboutPage = async () => {
  const { isEnabled: isDraftMode } = await draftMode()
  let aboutPageData = null
  try {
    const payload = await getPayloadClient()
    aboutPageData = await payload.findGlobal({
      slug: 'about-page',
      draft: isDraftMode,
      depth: 2,
    })
  } catch {
    aboutPageData = null
  }

  return <AboutPageClient initialData={aboutPageData as never} />
}

export default AboutPage
