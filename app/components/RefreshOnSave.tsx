'use client'

import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export const RefreshOnSave: React.FC = () => {
  const router = useRouter()
  const serverURL =
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_SERVER_URL || ''
      : window.location.origin

  return (
    <PayloadRefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={serverURL}
    />
  )
}
