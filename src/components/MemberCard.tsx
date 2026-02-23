'use client'

import Link from 'next/link'
import type { CharacterData } from '@/lib/armory'
import { CLASS_COLORS, CLASS_ICONS } from '@/lib/classData'

interface MemberCardProps {
  characterName: string
  realm: string
  guildRank: string
  role: string
  armoryData: CharacterData | null
  style?: React.CSSProperties
  className?: string
}

export default function MemberCard({
  characterName,
  realm,
  guildRank,
  role,
  armoryData,
  style,
  className,
}: MemberCardProps) {
  const armoryUrl = `https://turtlecraft.gg/armory/${realm}/${characterName}`

  if (!armoryData) {
    return (
      <div
        data-testid="member-card"
        className={`glass-card rounded-lg p-4${className ? ` ${className}` : ''}`}
        style={style}
      >
        <p className="font-heading font-bold text-off-white">{characterName}</p>
        <p className="text-muted text-sm">{realm} &middot; {guildRank}</p>
        <Link
          href={armoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold text-sm mt-2 inline-block"
        >
          View on Armory &rarr;
        </Link>
      </div>
    )
  }

  const classColor = CLASS_COLORS[armoryData.classKey] || '#FFFFFF'
  const classIcon = CLASS_ICONS[armoryData.classKey] || ''

  return (
    <div
      data-testid="member-card"
      className={`glass-card rounded-lg p-4 transition-shadow duration-200 hover:shadow-[0_0_12px_var(--class-color)]${className ? ` ${className}` : ''}`}
      style={{
        borderLeft: `3px solid ${classColor}`,
        '--class-color': classColor,
        ...style,
      } as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {armoryData.online && (
            <span
              data-testid="online-indicator"
              className="w-2 h-2 rounded-full bg-green-400 inline-block"
            />
          )}
          <span>{classIcon}</span>
          <Link
            href={armoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-bold text-off-white hover:text-gold transition-colors"
          >
            {armoryData.name}
          </Link>
        </div>
        <span className="text-gold/60">{armoryData.level}</span>
      </div>

      <p className="text-muted text-sm mt-1">
        {armoryData.race} {armoryData.className} &middot; {role}
      </p>

      {armoryData.rank && (
        <p className="text-gold text-sm mt-1">{armoryData.rank}</p>
      )}
    </div>
  )
}
