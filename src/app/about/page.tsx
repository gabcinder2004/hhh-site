import { client, isSanityConfigured } from '@/lib/sanity/client'
import { guildInfoQuery } from '@/lib/sanity/queries'
import type { GuildInfo } from '@/lib/sanity/types'
import AboutContent from '@/components/AboutContent'

export default async function AboutPage() {
  let guildInfo: GuildInfo | null = null
  if (isSanityConfigured) {
    try {
      guildInfo = await client.fetch(guildInfoQuery)
    } catch { /* Sanity not available */ }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-shimmer mb-8 font-display text-3xl font-bold md:text-4xl">About Happy Hour Heroes</h1>
      <AboutContent guildInfo={guildInfo} />
    </div>
  )
}
