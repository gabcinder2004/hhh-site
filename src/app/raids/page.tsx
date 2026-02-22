import { client } from '@/lib/sanity/client'
import { raidsQuery } from '@/lib/sanity/queries'
import type { Raid } from '@/lib/sanity/types'
import RaidTier from '@/components/RaidTier'

export default async function RaidsPage() {
  const raids: Raid[] = await client.fetch(raidsQuery)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-off-white">Raid Progress</h1>
      {raids.length === 0 ? (
        <p className="text-off-white/50">No raid progress yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {raids.map((raid, index) => (
            <RaidTier key={raid._id} raid={raid} defaultExpanded={index === 0} />
          ))}
        </div>
      )}
    </div>
  )
}
