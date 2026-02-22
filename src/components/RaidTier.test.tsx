import { describe, it, expect, vi } from 'vitest'
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

  const onToggle = vi.fn()

  it('renders the raid name', () => {
    render(<RaidTier raid={raid} isExpanded onToggle={onToggle} />)
    expect(screen.getByText('Molten Core')).toBeInTheDocument()
  })

  it('shows progress as kill ratio (e.g. "8/10")', () => {
    render(<RaidTier raid={raid} isExpanded onToggle={onToggle} />)
    expect(screen.getByText('8/10')).toBeInTheDocument()
  })

  it('renders a progress bar with gold fill', () => {
    render(<RaidTier raid={raid} isExpanded onToggle={onToggle} />)
    const progressBar = screen.getByTestId('progress-bar-fill')
    expect(progressBar.className).toMatch(/from-gold/)
    expect(progressBar.style.width).toBe('80%')
  })

  it('renders all bosses when expanded', () => {
    render(<RaidTier raid={raid} isExpanded onToggle={onToggle} />)
    const bossList = screen.getByTestId('boss-list')
    const bossRows = within(bossList).getAllByTestId('boss-row')
    expect(bossRows).toHaveLength(10)
  })

  it('hides bosses when collapsed', () => {
    render(<RaidTier raid={raid} isExpanded={false} onToggle={onToggle} />)
    expect(screen.queryByTestId('boss-list')).not.toBeInTheDocument()
  })

  it('calls onToggle when header is clicked', async () => {
    const toggle = vi.fn()
    const user = userEvent.setup()
    render(<RaidTier raid={raid} isExpanded={false} onToggle={toggle} />)

    await user.click(screen.getByRole('button', { name: /Molten Core/i }))
    expect(toggle).toHaveBeenCalledTimes(1)
  })

  it('shows full gold bar for fully cleared raid', () => {
    const clearedRaid: Raid = {
      _id: 'raid-2',
      _type: 'raid',
      name: 'Onyxia',
      order: 2,
      bosses: [{ name: 'Onyxia', killed: true, killDate: '2025-09-01' }],
    }
    render(<RaidTier raid={clearedRaid} isExpanded onToggle={onToggle} />)
    expect(screen.getByText('1/1')).toBeInTheDocument()
    expect(screen.getByTestId('progress-bar-fill').style.width).toBe('100%')
  })
})
