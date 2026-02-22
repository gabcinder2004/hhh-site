import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutContent from './AboutContent'
import type { GuildInfo } from '@/lib/sanity/types'

// Mock @portabletext/react
vi.mock('@portabletext/react', () => ({
  PortableText: ({ value }: { value: unknown }) => (
    <div data-testid="portable-text">{JSON.stringify(value)}</div>
  ),
}))

const mockGuildInfo: GuildInfo = {
  _id: 'guild-1',
  _type: 'guildInfo',
  description: [
    {
      _type: 'block',
      _key: 'block1',
      children: [{ _type: 'span', _key: 'span1', text: 'We are Happy Hour Heroes!', marks: [] }],
      markDefs: [],
      style: 'normal',
    },
  ],
  discordLink: 'https://discord.gg/example',
  officers: [
    { name: 'Thrall', role: 'Guild Master' },
    { name: 'Jaina', role: 'Officer' },
  ],
}

describe('AboutContent', () => {
  it('renders guild description as portable text', () => {
    render(<AboutContent guildInfo={mockGuildInfo} />)
    expect(screen.getByTestId('portable-text')).toBeInTheDocument()
  })

  it('renders Discord join button when discordLink is present', () => {
    render(<AboutContent guildInfo={mockGuildInfo} />)
    const button = screen.getByRole('link', { name: /discord/i })
    expect(button).toHaveAttribute('href', 'https://discord.gg/example')
    expect(button).toHaveAttribute('target', '_blank')
    expect(button).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('hides Discord button when discordLink is not present', () => {
    const infoWithoutDiscord: GuildInfo = {
      ...mockGuildInfo,
      discordLink: undefined,
    }
    render(<AboutContent guildInfo={infoWithoutDiscord} />)
    expect(screen.queryByRole('link', { name: /discord/i })).not.toBeInTheDocument()
  })

  it('renders officer list when officers array has items', () => {
    render(<AboutContent guildInfo={mockGuildInfo} />)
    expect(screen.getByText('Thrall')).toBeInTheDocument()
    expect(screen.getByText('Guild Master')).toBeInTheDocument()
    expect(screen.getByText('Jaina')).toBeInTheDocument()
    expect(screen.getByText('Officer')).toBeInTheDocument()
  })

  it('hides officer section when officers array is empty', () => {
    const infoWithoutOfficers: GuildInfo = {
      ...mockGuildInfo,
      officers: [],
    }
    render(<AboutContent guildInfo={infoWithoutOfficers} />)
    expect(screen.queryByRole('heading', { name: /officers/i })).not.toBeInTheDocument()
  })

  it('shows a generic welcome message when guildInfo is null', () => {
    render(<AboutContent guildInfo={null} />)
    expect(screen.getByText(/Welcome to Happy Hour Heroes/i)).toBeInTheDocument()
    expect(screen.queryByTestId('portable-text')).not.toBeInTheDocument()
  })
})
