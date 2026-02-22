import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RaidProgressList from './RaidProgressList'
import type { Raid } from '@/lib/sanity/types'

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
    bosses: [{ name: 'Onyxia', killed: true, killDate: '2025-09-01' }],
  },
  {
    _id: 'raid-3',
    _type: 'raid',
    name: 'Blackwing Lair',
    order: 3,
    bosses: [
      { name: 'Razorgore', killed: false },
      { name: 'Nefarian', killed: false },
    ],
  },
]

describe('RaidProgressList', () => {
  it('renders all raid tiers', () => {
    render(<RaidProgressList raids={mockRaids} />)
    expect(screen.getByText('Molten Core')).toBeInTheDocument()
    expect(screen.getByText('Onyxia')).toBeInTheDocument()
    expect(screen.getByText('Blackwing Lair')).toBeInTheDocument()
  })

  it('expands the first tier by default', () => {
    render(<RaidProgressList raids={mockRaids} />)
    expect(screen.getByText('Lucifron')).toBeInTheDocument()
    expect(screen.getByText('Ragnaros')).toBeInTheDocument()
  })

  it('collapses other tiers by default', () => {
    render(<RaidProgressList raids={mockRaids} />)
    const bossLists = screen.getAllByTestId('boss-list')
    expect(bossLists).toHaveLength(1)
  })

  it('implements accordion behavior - only one tier expanded at a time', async () => {
    const user = userEvent.setup()
    render(<RaidProgressList raids={mockRaids} />)

    // First tier is expanded
    expect(screen.getAllByTestId('boss-list')).toHaveLength(1)
    expect(screen.getByText('Lucifron')).toBeInTheDocument()

    // Click second tier to expand it
    await user.click(screen.getByRole('button', { name: /Onyxia/i }))

    // Now only second tier's boss list should be visible
    const bossLists = screen.getAllByTestId('boss-list')
    expect(bossLists).toHaveLength(1)
    expect(screen.queryByText('Lucifron')).not.toBeInTheDocument()
    // Onyxia boss should now be visible in the expanded boss list
    expect(screen.getByTestId('boss-row')).toBeInTheDocument()
  })

  it('allows collapsing all tiers by clicking the expanded tier', async () => {
    const user = userEvent.setup()
    render(<RaidProgressList raids={mockRaids} />)

    // Click the already-expanded first tier to collapse it
    await user.click(screen.getByRole('button', { name: /Molten Core/i }))

    expect(screen.queryByTestId('boss-list')).not.toBeInTheDocument()
  })

  it('shows empty state when no raids exist', () => {
    render(<RaidProgressList raids={[]} />)
    expect(
      screen.getByText('No raid progress recorded yet.')
    ).toBeInTheDocument()
  })
})
