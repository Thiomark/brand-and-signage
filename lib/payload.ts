import { getPayload, Payload } from 'payload'
import config from '@payload-config'

let payloadClient: Payload | null = null
let initializationFailed = false

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Connection timeout')), ms)
  )
  return Promise.race([promise, timeout])
}

export const getPayloadClient = async (): Promise<Payload> => {
  // If initialization already failed, throw immediately to use defaults
  if (initializationFailed) {
    throw new Error('PayloadCMS initialization previously failed')
  }

  // Return cached client if available
  if (payloadClient) {
    return payloadClient
  }

  try {
    // Add 5 second timeout for initialization
    payloadClient = await withTimeout(getPayload({ config }), 5000)
    return payloadClient
  } catch (error) {
    console.error('PayloadCMS initialization failed:', error)
    initializationFailed = true
    throw error
  }
}
