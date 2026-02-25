import { draftMode } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import { HomePageClient } from './HomePageClient'

export const revalidate = 60;

const HomePage = async () => {
  const { isEnabled: isDraftMode } = await draftMode()
  let homePageData = null
  try {
    const payload = await getPayloadClient()
    homePageData = await payload.findGlobal({
      slug: 'home-page',
      draft: isDraftMode,
      depth: 2,
    })
  } catch {
    homePageData = null
  }

  return <HomePageClient initialData={homePageData as never} />
};

export default HomePage;
