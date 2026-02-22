import { client, isSanityConfigured } from '@/lib/sanity/client'
import { raidsQuery } from '@/lib/sanity/queries'
import type { Raid } from '@/lib/sanity/types'
import RaidProgressList from '@/components/RaidProgressList'

export default async function RaidsPage() {
  let raids: Raid[] = []
  if (isSanityConfigured) {
    try {
      raids = await client.fetch(raidsQuery)
    } catch { /* Sanity not available */ }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-shimmer mb-8 font-display text-3xl font-bold md:text-4xl">Raid Progress</h1>
      <RaidProgressList raids={raids} />
    </div>
  )
}
