import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the ornamental divider', () => {
    render(<Footer />)
    expect(screen.getByText('♦')).toBeInTheDocument()
  })

  it('renders Discord link with correct href', () => {
    render(<Footer />)
    const discordLink = screen.getByLabelText('Join our Discord server')
    expect(discordLink).toHaveAttribute('href', 'https://discord.gg/YOUR_INVITE_CODE')
  })

  it('renders Discord link opening in new tab with security attributes', () => {
    render(<Footer />)
    const discordLink = screen.getByLabelText('Join our Discord server')
    expect(discordLink).toHaveAttribute('target', '_blank')
    expect(discordLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders Discord button text with icon', () => {
    render(<Footer />)
    expect(screen.getByText('Join Our Discord')).toBeInTheDocument()
  })

  it('renders footer navigation with aria-label', () => {
    render(<Footer />)
    const nav = screen.getByRole('navigation', { name: 'Footer navigation' })
    expect(nav).toBeInTheDocument()
  })

  it('renders all four navigation links with correct hrefs', () => {
    render(<Footer />)
    const links = [
      { label: 'Home', href: '/' },
      { label: 'Raids', href: '/raids' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'About', href: '/about' },
    ]
    links.forEach(({ label, href }) => {
      const link = screen.getByRole('link', { name: label })
      expect(link).toHaveAttribute('href', href)
    })
  })

  it('renders the guild tagline', () => {
    render(<Footer />)
    expect(screen.getByText(/Chill Raids/)).toBeInTheDocument()
    expect(screen.getByText(/Good People/)).toBeInTheDocument()
    expect(screen.getByText(/Classic Vibes/)).toBeInTheDocument()
  })

  it('renders copyright with the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(`Happy Hour Heroes.*${year}`))).toBeInTheDocument()
  })
})
