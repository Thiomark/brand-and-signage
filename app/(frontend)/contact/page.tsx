import { draftMode } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { ContactPageClient } from './ContactPageClient'

export const revalidate = 60

const ContactPage = async () => {
  const { isEnabled: isDraftMode } = await draftMode()
  let contactPageData = null
  try {
    const payload = await getPayloadClient()
    contactPageData = await payload.findGlobal({
      slug: 'contact-page',
      draft: isDraftMode,
      depth: 2,
    })
  } catch {
    contactPageData = null
  }

  return <ContactPageClient initialData={contactPageData as never} />
}

export default ContactPage
