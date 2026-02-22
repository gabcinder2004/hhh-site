'use client'

import { PortableText } from '@portabletext/react'
import type { GuildInfo } from '@/lib/sanity/types'

interface AboutContentProps {
  guildInfo: GuildInfo | null
}

export default function AboutContent({ guildInfo }: AboutContentProps) {
  if (!guildInfo) {
    return (
      <p className="text-off-white/80">
        Welcome to Happy Hour Heroes! More information coming soon.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="prose prose-invert max-w-none prose-headings:text-off-white prose-p:text-off-white/80 prose-a:text-gold prose-strong:text-off-white">
        <PortableText value={guildInfo.description} />
      </section>

      {guildInfo.discordLink && (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-off-white">Join Us</h2>
          <a
            href={guildInfo.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-gold px-6 py-3 font-bold text-navy hover:bg-gold/80"
          >
            Join our Discord
          </a>
        </section>
      )}

      {guildInfo.officers.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-off-white">Officers</h2>
          <ul className="flex flex-col gap-2">
            {guildInfo.officers.map((officer) => (
              <li key={officer.name} className="text-off-white/80">
                <span className="font-bold text-off-white">{officer.name}</span>{' '}
                <span>{officer.role}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
