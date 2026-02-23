import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

vi.mock('@/lib/sanity/client', () => ({
  isSanityConfigured: true,
  client: {
    fetch: vi.fn(),
  },
}))

vi.mock('@/lib/armory', () => ({
  fetchAllMembers: vi.fn(),
}))

import type { Member } from '@/lib/sanity/types'

const mockMembers: Member[] = [
  {
    _id: 'member-1',
    _type: 'member',
    characterName: 'Ox',
    realm: 'Ambershire',
    guildRank: 'gm',
    role: 'tank',
  },
  {
    _id: 'member-2',
    _type: 'member',
    characterName: 'Heals',
    realm: 'Ambershire',
    guildRank: 'officer',
    role: 'healer',
  },
]

describe('Roster Page', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('renders the Guild Roster heading', async () => {
    const { client } = await import('@/lib/sanity/client')
    const { fetchAllMembers } = await import('@/lib/armory')
    vi.mocked(client.fetch).mockResolvedValue(mockMembers)
    vi.mocked(fetchAllMembers).mockResolvedValue(new Map())

    const { default: RosterPage } = await import('./page')
    const result = await RosterPage()
    render(result)

    expect(screen.getByRole('heading', { name: /Guild Roster/i })).toBeInTheDocument()
  })

  it('renders member count subtitle', async () => {
    const { client } = await import('@/lib/sanity/client')
    const { fetchAllMembers } = await import('@/lib/armory')
    vi.mocked(client.fetch).mockResolvedValue(mockMembers)
    vi.mocked(fetchAllMembers).mockResolvedValue(new Map())

    const { default: RosterPage } = await import('./page')
    const result = await RosterPage()
    render(result)

    expect(screen.getByText(/2 members strong/i)).toBeInTheDocument()
  })

  it('renders empty state when no members exist', async () => {
    const { client } = await import('@/lib/sanity/client')
    const { fetchAllMembers } = await import('@/lib/armory')
    vi.mocked(client.fetch).mockResolvedValue([])
    vi.mocked(fetchAllMembers).mockResolvedValue(new Map())

    const { default: RosterPage } = await import('./page')
    const result = await RosterPage()
    render(result)

    expect(screen.getByText(/guild hall awaits/i)).toBeInTheDocument()
  })

  it('renders placeholder roster when Sanity is not configured', async () => {
    vi.doMock('@/lib/sanity/client', () => ({
      isSanityConfigured: false,
      client: { fetch: vi.fn() },
    }))

    const { default: RosterPage } = await import('./page')
    const result = await RosterPage()
    render(result)

    expect(screen.getByRole('heading', { name: /Guild Roster/i })).toBeInTheDocument()
    // Should show placeholder members
    const cards = screen.getAllByTestId('member-card')
    expect(cards.length).toBeGreaterThanOrEqual(3)
  })
})
