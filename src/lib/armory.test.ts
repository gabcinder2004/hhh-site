import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchCharacterData, fetchAllMembers } from './armory'

const mockCharacter = {
  name: 'Testchar',
  race: 6,
  class: 11,
  level: 60,
  gender: 0,
  guild_name: 'Happy Hour Heroes',
  rank: 'Raider',
  rank_number: '2',
  online: 1,
  avatar: 'avatar.png',
  equipment: [
    {
      slot: 1,
      name: 'Helm of Testing',
      icon: 'helm.png',
      quality: 4,
      qualityColor: '#a335ee',
      item_level: 66,
    },
  ],
  skills: [
    { skill: 164, value: 300, image: 'blacksmithing.png' },
  ],
}

function makeSnapshotHtml(charData: Record<string, unknown>): string {
  const snapshot = JSON.stringify({ data: { character: [charData] } })
  const encoded = snapshot
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return `<div wire:snapshot="${encoded}">content</div>`
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('fetchCharacterData', () => {
  it('extracts character data from wire:snapshot HTML', async () => {
    const html = makeSnapshotHtml(mockCharacter)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(html) }),
    )

    const result = await fetchCharacterData('turtle-pve', 'Testchar')

    expect(result).not.toBeNull()
    expect(result!.name).toBe('Testchar')
    expect(result!.race).toBe('Tauren')
    expect(result!.className).toBe('Druid')
    expect(result!.classKey).toBe('druid')
    expect(result!.level).toBe(60)
    expect(result!.gender).toBe(0)
    expect(result!.guildName).toBe('Happy Hour Heroes')
    expect(result!.rank).toBe('Raider')
    expect(result!.rankNumber).toBe(2)
    expect(result!.online).toBe(true)
    expect(result!.avatar).toBe('avatar.png')
    expect(result!.equipment).toHaveLength(1)
    expect(result!.equipment[0]).toEqual({
      slot: 1,
      name: 'Helm of Testing',
      icon: 'helm.png',
      quality: 4,
      qualityColor: '#a335ee',
      itemLevel: 66,
    })
    expect(result!.professions).toHaveLength(1)
    expect(result!.professions[0]).toEqual({
      skill: 164,
      value: 300,
      image: 'blacksmithing.png',
    })
  })

  it('returns null when wire:snapshot is missing from HTML', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('<html><body>No snapshot here</body></html>'),
      }),
    )

    const result = await fetchCharacterData('turtle-pve', 'Unknown')
    expect(result).toBeNull()
  })

  it('returns null on network/fetch error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network error')),
    )

    const result = await fetchCharacterData('turtle-pve', 'Testchar')
    expect(result).toBeNull()
  })

  it('returns null on non-ok HTTP response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false }),
    )

    const result = await fetchCharacterData('turtle-pve', 'Testchar')
    expect(result).toBeNull()
  })

  it('decodes HTML entities in wire:snapshot correctly', async () => {
    const charWithEntities = {
      ...mockCharacter,
      name: "Test'char",
      guild_name: 'Heroes & Villains',
    }
    const html = makeSnapshotHtml(charWithEntities)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(html) }),
    )

    const result = await fetchCharacterData('turtle-pve', "Test'char")
    expect(result).not.toBeNull()
    expect(result!.name).toBe("Test'char")
    expect(result!.guildName).toBe('Heroes & Villains')
  })

  it('maps race ID 6 to Tauren and class ID 11 to Druid', async () => {
    const html = makeSnapshotHtml(mockCharacter)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(html) }),
    )

    const result = await fetchCharacterData('turtle-pve', 'Testchar')
    expect(result!.race).toBe('Tauren')
    expect(result!.className).toBe('Druid')
    expect(result!.classKey).toBe('druid')
  })

  it('maps race ID 1 to Human and class ID 2 to Paladin', async () => {
    const humanPaladin = { ...mockCharacter, race: 1, class: 2 }
    const html = makeSnapshotHtml(humanPaladin)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(html) }),
    )

    const result = await fetchCharacterData('turtle-pve', 'Testchar')
    expect(result!.race).toBe('Human')
    expect(result!.className).toBe('Paladin')
    expect(result!.classKey).toBe('paladin')
  })
})

describe('fetchAllMembers', () => {
  it('fetches data for all members with delay', async () => {
    const html = makeSnapshotHtml(mockCharacter)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve(html) }),
    )

    const members = [
      { characterName: 'Testchar', realm: 'turtle-pve' },
      { characterName: 'Another', realm: 'turtle-pve' },
    ]

    const results = await fetchAllMembers(members, 0)
    expect(results.size).toBe(2)
    expect(results.get('Testchar')).not.toBeNull()
    expect(results.get('Another')).not.toBeNull()
  })
})
