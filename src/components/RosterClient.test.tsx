import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RosterClient from './RosterClient'
import type { CharacterData } from '@/lib/armory'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

function makeCharacter(overrides: Partial<CharacterData> = {}): CharacterData {
  return {
    name: 'Testchar',
    race: 'Tauren',
    className: 'Druid',
    classKey: 'druid',
    level: 60,
    gender: 0,
    guildName: 'Happy Hour Heroes',
    rank: 'Blood Guard',
    rankNumber: 7,
    online: false,
    avatar: null,
    equipment: [],
    professions: [],
    ...overrides,
  }
}

interface MemberEntry {
  characterName: string
  realm: string
  guildRank: 'gm' | 'officer' | 'raider' | 'member'
  role: 'tank' | 'healer' | 'dps'
  armoryData: CharacterData | null
}

const mockMembers: MemberEntry[] = [
  {
    characterName: 'GuildBoss',
    realm: 'Ambershire',
    guildRank: 'gm',
    role: 'tank',
    armoryData: makeCharacter({ name: 'GuildBoss', classKey: 'warrior', className: 'Warrior', race: 'Human' }),
  },
  {
    characterName: 'OfficerOne',
    realm: 'Ambershire',
    guildRank: 'officer',
    role: 'healer',
    armoryData: makeCharacter({ name: 'OfficerOne', classKey: 'priest', className: 'Priest', race: 'Human' }),
  },
  {
    characterName: 'RaiderDruid',
    realm: 'Ambershire',
    guildRank: 'raider',
    role: 'dps',
    armoryData: makeCharacter({ name: 'RaiderDruid', classKey: 'druid', className: 'Druid', race: 'Tauren' }),
  },
  {
    characterName: 'MemberRogue',
    realm: 'Ambershire',
    guildRank: 'member',
    role: 'dps',
    armoryData: makeCharacter({ name: 'MemberRogue', classKey: 'rogue', className: 'Rogue', race: 'Undead' }),
  },
]

describe('RosterClient', () => {
  it('renders all members', () => {
    render(<RosterClient members={mockMembers} />)
    expect(screen.getByText('GuildBoss')).toBeInTheDocument()
    expect(screen.getByText('OfficerOne')).toBeInTheDocument()
    expect(screen.getByText('RaiderDruid')).toBeInTheDocument()
    expect(screen.getByText('MemberRogue')).toBeInTheDocument()
  })

  it('groups members by rank with rank headings', () => {
    render(<RosterClient members={mockMembers} />)
    expect(screen.getByText('Guild Master')).toBeInTheDocument()
    expect(screen.getByText('Officers')).toBeInTheDocument()
    expect(screen.getByText('Raiders')).toBeInTheDocument()
    expect(screen.getByText('Members')).toBeInTheDocument()
  })

  it('renders the class filter bar', () => {
    render(<RosterClient members={mockMembers} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Warrior' })).toBeInTheDocument()
  })

  it('fades non-matching members when a class filter is active', async () => {
    const user = userEvent.setup()
    render(<RosterClient members={mockMembers} />)
    await user.click(screen.getByRole('button', { name: 'Druid' }))

    const cards = screen.getAllByTestId('member-card')
    // RaiderDruid is a druid — should be full opacity
    const druidCard = cards.find(card => within(card).queryByText('RaiderDruid'))
    expect(druidCard).toBeDefined()

    // Non-druid cards should have reduced opacity via style
    const warriorCard = cards.find(card => within(card).queryByText('GuildBoss'))
    expect(warriorCard?.style.opacity).toBe('0.15')
  })

  it('resets all cards to full opacity when clicking All', async () => {
    const user = userEvent.setup()
    render(<RosterClient members={mockMembers} />)
    await user.click(screen.getByRole('button', { name: 'Druid' }))
    await user.click(screen.getByRole('button', { name: 'All' }))

    const cards = screen.getAllByTestId('member-card')
    cards.forEach(card => {
      expect(card.style.opacity).not.toBe('0.15')
    })
  })

  it('gives the GM card a col-span-2 class on desktop', () => {
    render(<RosterClient members={mockMembers} />)
    const cards = screen.getAllByTestId('member-card')
    const gmCard = cards.find(card => within(card).queryByText('GuildBoss'))
    expect(gmCard?.className).toMatch(/md:col-span-2/)
  })

  it('applies staggered animation delays to cards', () => {
    render(<RosterClient members={mockMembers} />)
    const cards = screen.getAllByTestId('member-card')
    // Each card should have an increasing animation delay
    const delays = cards.map(card => card.style.animationDelay)
    for (let i = 1; i < delays.length; i++) {
      expect(parseFloat(delays[i])).toBeGreaterThan(parseFloat(delays[i - 1]))
    }
  })

  it('does not render rank groups with no members', () => {
    const officersOnly: MemberEntry[] = [
      {
        characterName: 'Solo',
        realm: 'Ambershire',
        guildRank: 'officer',
        role: 'tank',
        armoryData: makeCharacter({ name: 'Solo', classKey: 'paladin', className: 'Paladin' }),
      },
    ]
    render(<RosterClient members={officersOnly} />)
    expect(screen.getByText('Officers')).toBeInTheDocument()
    expect(screen.queryByText('Guild Master')).not.toBeInTheDocument()
    expect(screen.queryByText('Raiders')).not.toBeInTheDocument()
    expect(screen.queryByText('Members')).not.toBeInTheDocument()
  })
})
