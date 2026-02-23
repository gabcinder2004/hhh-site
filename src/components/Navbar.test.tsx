import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar'

// Mock next/navigation
const mockUsePathname = vi.fn()
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('Navbar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  it('renders the brand name', () => {
    render(<Navbar />)
    expect(screen.getByText('Happy Hour Heroes')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Raids' })).toHaveAttribute('href', '/raids')
    expect(screen.getByRole('link', { name: 'Roster' })).toHaveAttribute('href', '/roster')
    expect(screen.getByRole('link', { name: 'Gallery' })).toHaveAttribute('href', '/gallery')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  it('highlights the active link with gold color', () => {
    mockUsePathname.mockReturnValue('/raids')
    render(<Navbar />)
    const raidsLink = screen.getByRole('link', { name: 'Raids' })
    expect(raidsLink.className).toMatch(/text-gold/)
  })

  it('does not highlight inactive links with gold', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Navbar />)
    const raidsLink = screen.getByRole('link', { name: 'Raids' })
    const classes = raidsLink.className.split(/\s+/)
    expect(classes).not.toContain('text-gold')
  })

  it('renders Roster link between Raids and Gallery', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation')
    const links = within(nav).getAllByRole('link')
    const labels = links.map((link) => link.textContent)
    const raidsIndex = labels.indexOf('Raids')
    const rosterIndex = labels.indexOf('Roster')
    const galleryIndex = labels.indexOf('Gallery')
    expect(rosterIndex).toBeGreaterThan(raidsIndex)
    expect(rosterIndex).toBeLessThan(galleryIndex)
  })

  it('has a fixed top position', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation')
    expect(nav.className).toMatch(/fixed/)
    expect(nav.className).toMatch(/top-0/)
  })

  describe('Mobile navigation', () => {
    it('renders a hamburger menu button', () => {
      render(<Navbar />)
      expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument()
    })

    it('hamburger button is hidden on desktop (md:hidden class)', () => {
      render(<Navbar />)
      const button = screen.getByRole('button', { name: /menu/i })
      expect(button.className).toMatch(/md:hidden/)
    })

    it('opens mobile menu when hamburger is clicked', async () => {
      const user = userEvent.setup()
      render(<Navbar />)
      const button = screen.getByRole('button', { name: /menu/i })
      await user.click(button)

      const mobileMenu = screen.getByTestId('mobile-menu')
      expect(mobileMenu).toBeInTheDocument()

      const menuLinks = within(mobileMenu).getAllByRole('link')
      expect(menuLinks).toHaveLength(5)
    })

    it('closes mobile menu when a link is clicked', async () => {
      const user = userEvent.setup()
      render(<Navbar />)

      await user.click(screen.getByRole('button', { name: /menu/i }))
      const mobileMenu = screen.getByTestId('mobile-menu')
      const homeLink = within(mobileMenu).getByRole('link', { name: 'Home' })
      await user.click(homeLink)

      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
    })

    it('closes mobile menu when close button is clicked', async () => {
      const user = userEvent.setup()
      render(<Navbar />)

      await user.click(screen.getByRole('button', { name: /menu/i }))
      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: /close/i }))
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
    })
  })
})
