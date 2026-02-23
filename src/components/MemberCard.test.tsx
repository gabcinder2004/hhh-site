import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import MemberCard from './MemberCard'
import type { CharacterData } from '@/lib/armory'

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

const enrichedData: CharacterData = {
  name: 'Arthas',
  race: 'Human',
  className: 'Paladin',
  classKey: 'paladin',
  level: 60,
  gender: 0,
  guildName: 'Happy Hour Heroes',
  rank: 'Knight-Captain',
  rankNumber: 8,
  online: true,
  avatar: null,
  equipment: [],
  professions: [],
}

const baseProps = {
  characterName: 'Arthas',
  realm: 'PvE',
  guildRank: 'Officer',
  role: 'Tank',
}

describe('MemberCard', () => {
  describe('Enriched card (with armory data)', () => {
    it('renders name, level, race, class, and role', () => {
      render(<MemberCard {...baseProps} armoryData={enrichedData} />)
      expect(screen.getByText('Arthas')).toBeInTheDocument()
      expect(screen.getByText('60')).toBeInTheDocument()
      expect(screen.getByText(/Human Paladin/)).toBeInTheDocument()
      expect(screen.getByText(/Tank/)).toBeInTheDocument()
    })

    it('renders PvP rank when present', () => {
      render(<MemberCard {...baseProps} armoryData={enrichedData} />)
      expect(screen.getByText('Knight-Captain')).toBeInTheDocument()
    })

    it('has a class-colored left border', () => {
      render(<MemberCard {...baseProps} armoryData={enrichedData} />)
      const card = screen.getByTestId('member-card')
      expect(card.style.borderLeft).toBe('3px solid rgb(244, 140, 186)')
    })

    it('links name to armory profile', () => {
      render(<MemberCard {...baseProps} armoryData={enrichedData} />)
      const link = screen.getByRole('link', { name: 'Arthas' })
      expect(link).toHaveAttribute('href', 'https://turtlecraft.gg/armory/PvE/Arthas')
    })

    it('shows green online indicator when member is online', () => {
      render(<MemberCard {...baseProps} armoryData={enrichedData} />)
      expect(screen.getByTestId('online-indicator')).toBeInTheDocument()
    })

    it('does not show online indicator when member is offline', () => {
      const offlineData = { ...enrichedData, online: false }
      render(<MemberCard {...baseProps} armoryData={offlineData} />)
      expect(screen.queryByTestId('online-indicator')).not.toBeInTheDocument()
    })

    it('omits PvP rank when rank is null', () => {
      const noRankData = { ...enrichedData, rank: null, rankNumber: null }
      render(<MemberCard {...baseProps} armoryData={noRankData} />)
      expect(screen.queryByText('Knight-Captain')).not.toBeInTheDocument()
    })

    it('sets --class-color CSS variable for hover glow', () => {
      render(<MemberCard {...baseProps} armoryData={enrichedData} />)
      const card = screen.getByTestId('member-card')
      expect(card.style.getPropertyValue('--class-color')).toBe('#F48CBA')
    })
  })

  describe('Fallback card (no armory data)', () => {
    it('shows character name, realm, and guild rank', () => {
      render(<MemberCard {...baseProps} armoryData={null} />)
      expect(screen.getByText('Arthas')).toBeInTheDocument()
      expect(screen.getByText(/PvE/)).toBeInTheDocument()
      expect(screen.getByText(/Officer/)).toBeInTheDocument()
    })

    it('shows "View on Armory" link', () => {
      render(<MemberCard {...baseProps} armoryData={null} />)
      const link = screen.getByRole('link', { name: /View on Armory/ })
      expect(link).toHaveAttribute('href', 'https://turtlecraft.gg/armory/PvE/Arthas')
    })
  })
})
