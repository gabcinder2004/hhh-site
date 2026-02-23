import { client, isSanityConfigured } from '@/lib/sanity/client'
import { membersQuery } from '@/lib/sanity/queries'
import type { Member } from '@/lib/sanity/types'
import { fetchAllMembers } from '@/lib/armory'
import RosterClient from '@/components/RosterClient'

const PLACEHOLDER_MEMBERS = [
  { characterName: 'Thundor', realm: 'Ambershire', guildRank: 'gm' as const, role: 'tank' as const, armoryData: { name: 'Thundor', race: 'Tauren', className: 'Warrior', classKey: 'warrior', level: 60, gender: 0, guildName: 'Happy Hour Heroes', rank: 'Warlord', rankNumber: 11, online: true, avatar: null, equipment: [], professions: [] } },
  { characterName: 'Lightweave', realm: 'Ambershire', guildRank: 'officer' as const, role: 'healer' as const, armoryData: { name: 'Lightweave', race: 'Human', className: 'Priest', classKey: 'priest', level: 60, gender: 1, guildName: 'Happy Hour Heroes', rank: 'Knight-Captain', rankNumber: 8, online: false, avatar: null, equipment: [], professions: [] } },
  { characterName: 'Shadowstep', realm: 'Ambershire', guildRank: 'raider' as const, role: 'dps' as const, armoryData: { name: 'Shadowstep', race: 'Undead', className: 'Rogue', classKey: 'rogue', level: 60, gender: 0, guildName: 'Happy Hour Heroes', rank: null, rankNumber: null, online: true, avatar: null, equipment: [], professions: [] } },
]

export default async function RosterPage() {
  let members: Member[] = []

  if (isSanityConfigured) {
    try {
      members = await client.fetch(membersQuery)
    } catch { /* Sanity not available */ }
  }

  if (!isSanityConfigured) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-shimmer mb-2 font-display text-3xl font-bold md:text-4xl">Guild Roster</h1>
        <p className="mb-8 text-muted">3 members strong</p>
        <RosterClient members={PLACEHOLDER_MEMBERS} />
      </div>
    )
  }

  if (members.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-shimmer mb-2 font-display text-3xl font-bold md:text-4xl">Guild Roster</h1>
        <p className="mt-8 text-center text-muted italic">The guild hall awaits its heroes...</p>
      </div>
    )
  }

  const armoryDataMap = await fetchAllMembers(members, 500)

  const enrichedMembers = members.map((member) => ({
    characterName: member.characterName,
    realm: member.realm,
    guildRank: member.guildRank,
    role: member.role,
    armoryData: armoryDataMap.get(member.characterName) || null,
  }))

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-shimmer mb-2 font-display text-3xl font-bold md:text-4xl">Guild Roster</h1>
      <p className="mb-8 text-muted">{members.length} members strong</p>
      <RosterClient members={enrichedMembers} />
    </div>
  )
}
