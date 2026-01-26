import { getPayload, Payload } from 'payload'
import config from '@payload-config'

let payloadClient: Payload | null = null

export const getPayloadClient = async (): Promise<Payload> => {
  // Return cached client if available
  if (payloadClient) {
    return payloadClient
  }

  try {
    payloadClient = await getPayload({ config })
    return payloadClient
  } catch (error) {
    console.error('PayloadCMS initialization failed:', error)
    throw error
  }
}
