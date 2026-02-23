'use client'

import { useState } from 'react'
import type { CharacterData } from '@/lib/armory'
import { RANK_NAMES } from '@/lib/classData'
import ClassFilter from './ClassFilter'
import RankGroup from './RankGroup'
import MemberCard from './MemberCard'

interface MemberEntry {
  characterName: string
  realm: string
  guildRank: 'gm' | 'officer' | 'raider' | 'member'
  role: 'tank' | 'healer' | 'dps'
  armoryData: CharacterData | null
}

interface RosterClientProps {
  members: MemberEntry[]
}

const RANK_KEYS = ['gm', 'officer', 'raider', 'member'] as const

export default function RosterClient({ members }: RosterClientProps) {
  const [activeClass, setActiveClass] = useState<string | null>(null)

  const grouped = RANK_KEYS.reduce(
    (acc, rank) => {
      acc[rank] = members.filter((m) => m.guildRank === rank)
      return acc
    },
    {} as Record<string, MemberEntry[]>,
  )

  let cardIndex = 0

  return (
    <div>
      <ClassFilter activeClass={activeClass} onClassSelect={setActiveClass} />

      {RANK_KEYS.map((rank) => {
        const rankMembers = grouped[rank]
        if (rankMembers.length === 0) return null

        const hasMatch = activeClass
          ? rankMembers.some((m) => m.armoryData?.classKey === activeClass)
          : true
        const sectionOpacity = activeClass && !hasMatch ? 0.15 : 1

        return (
          <div key={rank} className="mb-10">
            <RankGroup rankName={RANK_NAMES[rank]} opacity={sectionOpacity}>
              {rankMembers.map((member) => {
                const isMatch =
                  !activeClass || member.armoryData?.classKey === activeClass
                const cardOpacity = activeClass && !isMatch ? 0.15 : 1
                const delay = cardIndex * 0.06
                cardIndex++
                const isGm = member.guildRank === 'gm'

                return (
                  <MemberCard
                    key={member.characterName}
                    characterName={member.characterName}
                    realm={member.realm}
                    guildRank={member.guildRank}
                    role={member.role}
                    armoryData={member.armoryData}
                    className={isGm ? 'md:col-span-2 animate-[glowPulse_3s_ease-in-out_infinite]' : undefined}
                    style={{
                      opacity: cardOpacity,
                      animationDelay: `${delay}s`,
                    }}
                  />
                )
              })}
            </RankGroup>
          </div>
        )
      })}
    </div>
  )
}
