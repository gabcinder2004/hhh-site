import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TagFilter from './TagFilter'

describe('TagFilter', () => {
  const tags = ['Raid', 'PvP', 'Social']
  const onTagSelect = vi.fn()

  it('renders an "All" button', () => {
    render(<TagFilter tags={tags} activeTag={null} onTagSelect={onTagSelect} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
  })

  it('renders a button for each tag', () => {
    render(<TagFilter tags={tags} activeTag={null} onTagSelect={onTagSelect} />)
    expect(screen.getByRole('button', { name: 'Raid' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'PvP' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Social' })).toBeInTheDocument()
  })

  it('styles the active tag button with gold background', () => {
    render(<TagFilter tags={tags} activeTag="Raid" onTagSelect={onTagSelect} />)
    const raidButton = screen.getByRole('button', { name: 'Raid' })
    expect(raidButton.className).toMatch(/bg-gold/)
  })

  it('styles the "All" button with gold background when no tag is active', () => {
    render(<TagFilter tags={tags} activeTag={null} onTagSelect={onTagSelect} />)
    const allButton = screen.getByRole('button', { name: 'All' })
    expect(allButton.className).toMatch(/bg-gold/)
  })

  it('styles inactive tag buttons without gold background', () => {
    render(<TagFilter tags={tags} activeTag="Raid" onTagSelect={onTagSelect} />)
    const pvpButton = screen.getByRole('button', { name: 'PvP' })
    expect(pvpButton.className).not.toMatch(/bg-gold/)
  })

  it('calls onTagSelect with the tag string when a tag is clicked', async () => {
    const user = userEvent.setup()
    render(<TagFilter tags={tags} activeTag={null} onTagSelect={onTagSelect} />)
    await user.click(screen.getByRole('button', { name: 'PvP' }))
    expect(onTagSelect).toHaveBeenCalledWith('PvP')
  })

  it('calls onTagSelect with null when "All" is clicked', async () => {
    const user = userEvent.setup()
    render(<TagFilter tags={tags} activeTag="Raid" onTagSelect={onTagSelect} />)
    await user.click(screen.getByRole('button', { name: 'All' }))
    expect(onTagSelect).toHaveBeenCalledWith(null)
  })
})
