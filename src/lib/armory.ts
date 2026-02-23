import { CLASS_ID_MAP, CLASS_NAMES, RACE_NAMES } from './classData'

export interface CharacterData {
  name: string
  race: string
  className: string
  classKey: string
  level: number
  gender: number
  guildName: string | null
  rank: string | null
  rankNumber: number | null
  online: boolean
  avatar: string | null
  equipment: EquipmentItem[]
  professions: Profession[]
}

export interface EquipmentItem {
  slot: number
  name: string
  icon: string
  quality: number
  qualityColor: string
  itemLevel: number
}

export interface Profession {
  skill: number
  value: number
  image: string
}

export async function fetchCharacterData(
  realm: string,
  name: string,
): Promise<CharacterData | null> {
  try {
    const res = await fetch(`https://turtlecraft.gg/armory/${realm}/${name}`)
    if (!res.ok) return null
    const html = await res.text()
    const match = html.match(/wire:snapshot="([^"]+)"/)
    if (!match) return null
    const decoded = match[1]
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#039;/g, "'")
    const snapshot = JSON.parse(decoded)
    const char = snapshot.data.character[0]
    const classKey = CLASS_ID_MAP[char.class] || 'warrior'
    return {
      name: char.name,
      race: RACE_NAMES[char.race] || 'Unknown',
      className: CLASS_NAMES[classKey] || 'Unknown',
      classKey,
      level: char.level,
      gender: char.gender,
      guildName: char.guild_name || null,
      rank: char.rank || null,
      rankNumber: char.rank_number ? Number(char.rank_number) : null,
      online: char.online === 1,
      avatar: char.avatar || null,
      equipment: (char.equipment || []).map(
        (e: Record<string, unknown>) => ({
          slot: e.slot,
          name: e.name,
          icon: e.icon,
          quality: e.quality,
          qualityColor: e.qualityColor,
          itemLevel: e.item_level,
        }),
      ),
      professions: (char.skills || []).map(
        (s: Record<string, unknown>) => ({
          skill: s.skill,
          value: s.value,
          image: s.image,
        }),
      ),
    }
  } catch {
    return null
  }
}

export async function fetchAllMembers(
  members: { characterName: string; realm: string }[],
  delayMs = 500,
): Promise<Map<string, CharacterData | null>> {
  const results = new Map<string, CharacterData | null>()
  for (const member of members) {
    const data = await fetchCharacterData(member.realm, member.characterName)
    results.set(member.characterName, data)
    if (delayMs > 0) await new Promise((r) => setTimeout(r, delayMs))
  }
  return results
}
