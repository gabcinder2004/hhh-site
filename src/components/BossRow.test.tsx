import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BossRow from './BossRow'
import type { Boss } from '@/lib/sanity/types'

describe('BossRow', () => {
  const killedBoss: Boss = {
    name: 'Ragnaros',
    killed: true,
    killDate: '2025-12-15',
  }

  const unkilledBoss: Boss = {
    name: 'Nefarian',
    killed: false,
  }

  it('renders the boss name', () => {
    render(<BossRow boss={killedBoss} />)
    expect(screen.getByText('Ragnaros')).toBeInTheDocument()
  })

  it('shows a gold checkmark for killed bosses', () => {
    render(<BossRow boss={killedBoss} />)
    const checkmark = screen.getByTestId('boss-status-icon')
    expect(checkmark.className).toMatch(/text-gold/)
    expect(checkmark.textContent).toBe('✓')
  })

  it('shows the kill date for killed bosses', () => {
    render(<BossRow boss={killedBoss} />)
    expect(screen.getByText(/2025-12-15/)).toBeInTheDocument()
  })

  it('uses dimmed grey styling for unkilled bosses', () => {
    render(<BossRow boss={unkilledBoss} />)
    const row = screen.getByTestId('boss-row')
    expect(row.className).toMatch(/text-gray/)
  })

  it('does not show a checkmark for unkilled bosses', () => {
    render(<BossRow boss={unkilledBoss} />)
    const icon = screen.getByTestId('boss-status-icon')
    expect(icon.textContent).not.toBe('✓')
  })

  it('does not show a kill date for unkilled bosses', () => {
    render(<BossRow boss={unkilledBoss} />)
    expect(screen.queryByText(/2025/)).not.toBeInTheDocument()
  })
})
