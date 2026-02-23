import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ClassFilter from './ClassFilter'

describe('ClassFilter', () => {
  const onClassSelect = vi.fn()

  beforeEach(() => {
    onClassSelect.mockClear()
  })

  it('renders an "All" button', () => {
    render(<ClassFilter activeClass={null} onClassSelect={onClassSelect} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
  })

  it('renders 9 class filter buttons (one per class)', () => {
    render(<ClassFilter activeClass={null} onClassSelect={onClassSelect} />)
    const buttons = screen.getAllByRole('button')
    // 9 class buttons + 1 "All" button = 10
    expect(buttons).toHaveLength(10)
  })

  it('each class button has an accessible name (class name)', () => {
    render(<ClassFilter activeClass={null} onClassSelect={onClassSelect} />)
    const classNames = ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock', 'Druid']
    classNames.forEach((name) => {
      expect(screen.getByRole('button', { name })).toBeInTheDocument()
    })
  })

  it('clicking a class button calls onClassSelect with the class key', async () => {
    const user = userEvent.setup()
    render(<ClassFilter activeClass={null} onClassSelect={onClassSelect} />)
    await user.click(screen.getByRole('button', { name: 'Warrior' }))
    expect(onClassSelect).toHaveBeenCalledWith('warrior')
  })

  it('clicking "All" calls onClassSelect with null', async () => {
    const user = userEvent.setup()
    render(<ClassFilter activeClass="warrior" onClassSelect={onClassSelect} />)
    await user.click(screen.getByRole('button', { name: 'All' }))
    expect(onClassSelect).toHaveBeenCalledWith(null)
  })

  it('active class button has aria-pressed="true"', () => {
    render(<ClassFilter activeClass="mage" onClassSelect={onClassSelect} />)
    const mageButton = screen.getByRole('button', { name: 'Mage' })
    expect(mageButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('"All" button is styled as active when activeClass is null', () => {
    render(<ClassFilter activeClass={null} onClassSelect={onClassSelect} />)
    const allButton = screen.getByRole('button', { name: 'All' })
    expect(allButton.className).toMatch(/from-gold/)
  })

  it('inactive class buttons have aria-pressed="false"', () => {
    render(<ClassFilter activeClass="mage" onClassSelect={onClassSelect} />)
    const warriorButton = screen.getByRole('button', { name: 'Warrior' })
    expect(warriorButton).toHaveAttribute('aria-pressed', 'false')
  })

  it('clicking the active class calls onClassSelect with null (toggle off)', async () => {
    const user = userEvent.setup()
    render(<ClassFilter activeClass="rogue" onClassSelect={onClassSelect} />)
    await user.click(screen.getByRole('button', { name: 'Rogue' }))
    expect(onClassSelect).toHaveBeenCalledWith(null)
  })
})
