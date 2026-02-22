import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: /Happy Hour Heroes/i })).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<Hero />)
    expect(screen.getByText(/Alliance & Horde/)).toBeInTheDocument()
    expect(screen.getByText(/TurtleWoW/)).toBeInTheDocument()
  })

  it('renders a CTA button linking to /about', () => {
    render(<Hero />)
    const cta = screen.getByRole('link', { name: /Join Us/i })
    expect(cta).toHaveAttribute('href', '/about')
  })

  it('is a full-width section', () => {
    render(<Hero />)
    const section = screen.getByTestId('hero-section')
    expect(section.className).toMatch(/w-full/)
  })
})
