import { createClient, type SanityClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

export const isSanityConfigured = Boolean(projectId)

let _client: SanityClient | null = null

export const client: SanityClient = new Proxy({} as SanityClient, {
  get(_target, prop) {
    if (!_client) {
      if (!isSanityConfigured) {
        throw new Error('Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID.')
      }
      _client = createClient({
        projectId,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
        apiVersion: '2024-01-01',
        useCdn: true,
      })
    }
    return (_client as unknown as Record<string, unknown>)[prop as string]
  },
})
