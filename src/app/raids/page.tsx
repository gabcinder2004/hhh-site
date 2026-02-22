import { client } from '@/lib/sanity/client'
import { raidsQuery } from '@/lib/sanity/queries'
import type { Raid } from '@/lib/sanity/types'
import RaidProgressList from '@/components/RaidProgressList'

export default async function RaidsPage() {
  const raids: Raid[] = await client.fetch(raidsQuery)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-off-white">Raid Progress</h1>
      <RaidProgressList raids={raids} />
    </div>
  )
}
