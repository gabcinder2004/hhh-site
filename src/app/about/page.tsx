import { client } from '@/lib/sanity/client'
import { guildInfoQuery } from '@/lib/sanity/queries'
import type { GuildInfo } from '@/lib/sanity/types'
import AboutContent from '@/components/AboutContent'

export default async function AboutPage() {
  const guildInfo: GuildInfo | null = await client.fetch(guildInfoQuery)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-off-white">About Happy Hour Heroes</h1>
      <AboutContent guildInfo={guildInfo} />
    </div>
  )
}
