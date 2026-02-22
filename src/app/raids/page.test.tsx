import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import RaidsPage from './page'
import type { Raid } from '@/lib/sanity/types'

// Mock the Sanity client
const mockFetch = vi.fn()
vi.mock('@/lib/sanity/client', () => ({
  isSanityConfigured: true,
  client: { fetch: (...args: unknown[]) => mockFetch(...args) },
}))

const mockRaids: Raid[] = [
  {
    _id: 'raid-1',
    _type: 'raid',
    name: 'Molten Core',
    order: 1,
    bosses: [
      { name: 'Lucifron', killed: true, killDate: '2025-10-01' },
      { name: 'Ragnaros', killed: false },
    ],
  },
  {
    _id: 'raid-2',
    _type: 'raid',
    name: 'Onyxia',
    order: 2,
    bosses: [
      { name: 'Onyxia', killed: true, killDate: '2025-09-01' },
    ],
  },
]

describe('RaidsPage', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders the page heading', async () => {
    mockFetch.mockResolvedValue(mockRaids)
    render(await RaidsPage())
    expect(screen.getByRole('heading', { name: /Raid Progress/i })).toBeInTheDocument()
  })

  it('renders all raid tiers', async () => {
    mockFetch.mockResolvedValue(mockRaids)
    render(await RaidsPage())
    expect(screen.getByText('Molten Core')).toBeInTheDocument()
    expect(screen.getByText('Onyxia')).toBeInTheDocument()
  })

  it('expands the first (most current) tier by default', async () => {
    mockFetch.mockResolvedValue(mockRaids)
    render(await RaidsPage())
    // First raid's bosses should be visible
    expect(screen.getByText('Lucifron')).toBeInTheDocument()
    expect(screen.getByText('Ragnaros')).toBeInTheDocument()
  })

  it('collapses older tiers by default', async () => {
    mockFetch.mockResolvedValue(mockRaids)
    render(await RaidsPage())
    // Only 1 boss list should be expanded (the first tier)
    const allBossLists = screen.getAllByTestId('boss-list')
    expect(allBossLists).toHaveLength(1)
  })

  it('shows empty state when no raids exist', async () => {
    mockFetch.mockResolvedValue([])
    render(await RaidsPage())
    expect(screen.getByText('No raid progress recorded yet.')).toBeInTheDocument()
  })
})
