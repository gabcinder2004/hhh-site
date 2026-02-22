import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RaidTier from './RaidTier'
import type { Raid } from '@/lib/sanity/types'

describe('RaidTier', () => {
  const raid: Raid = {
    _id: 'raid-1',
    _type: 'raid',
    name: 'Molten Core',
    order: 1,
    bosses: [
      { name: 'Lucifron', killed: true, killDate: '2025-10-01' },
      { name: 'Magmadar', killed: true, killDate: '2025-10-01' },
      { name: 'Gehennas', killed: true, killDate: '2025-10-08' },
      { name: 'Garr', killed: true, killDate: '2025-10-08' },
      { name: 'Shazzrah', killed: true, killDate: '2025-10-15' },
      { name: 'Baron Geddon', killed: true, killDate: '2025-10-15' },
      { name: 'Sulfuron', killed: true, killDate: '2025-10-22' },
      { name: 'Golemagg', killed: true, killDate: '2025-10-22' },
      { name: 'Majordomo', killed: false },
      { name: 'Ragnaros', killed: false },
    ],
  }

  it('renders the raid name', () => {
    render(<RaidTier raid={raid} defaultExpanded />)
    expect(screen.getByText('Molten Core')).toBeInTheDocument()
  })

  it('shows progress as kill ratio (e.g. "8/10")', () => {
    render(<RaidTier raid={raid} defaultExpanded />)
    expect(screen.getByText('8/10')).toBeInTheDocument()
  })

  it('renders a progress bar with gold fill', () => {
    render(<RaidTier raid={raid} defaultExpanded />)
    const progressBar = screen.getByTestId('progress-bar-fill')
    expect(progressBar.className).toMatch(/bg-gold/)
    expect(progressBar.style.width).toBe('80%')
  })

  it('renders all bosses when expanded', () => {
    render(<RaidTier raid={raid} defaultExpanded />)
    const bossList = screen.getByTestId('boss-list')
    const bossRows = within(bossList).getAllByTestId('boss-row')
    expect(bossRows).toHaveLength(10)
  })

  it('hides bosses when collapsed', () => {
    render(<RaidTier raid={raid} defaultExpanded={false} />)
    expect(screen.queryByTestId('boss-list')).not.toBeInTheDocument()
  })

  it('toggles between expanded and collapsed on click', async () => {
    const user = userEvent.setup()
    render(<RaidTier raid={raid} defaultExpanded={false} />)

    expect(screen.queryByTestId('boss-list')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Molten Core/i }))
    expect(screen.getByTestId('boss-list')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Molten Core/i }))
    expect(screen.queryByTestId('boss-list')).not.toBeInTheDocument()
  })

  it('shows full gold bar for fully cleared raid', () => {
    const clearedRaid: Raid = {
      _id: 'raid-2',
      _type: 'raid',
      name: 'Onyxia',
      order: 2,
      bosses: [{ name: 'Onyxia', killed: true, killDate: '2025-09-01' }],
    }
    render(<RaidTier raid={clearedRaid} defaultExpanded />)
    expect(screen.getByText('1/1')).toBeInTheDocument()
    expect(screen.getByTestId('progress-bar-fill').style.width).toBe('100%')
  })
})
