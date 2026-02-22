'use client'

import type { Raid } from '@/lib/sanity/types'
import BossRow from './BossRow'

interface RaidTierProps {
  raid: Raid
  isExpanded: boolean
  onToggle: () => void
}

export default function RaidTier({ raid, isExpanded, onToggle }: RaidTierProps) {
  const killed = raid.bosses.filter((b) => b.killed).length
  const total = raid.bosses.length
  const percent = total > 0 ? Math.round((killed / total) * 100) : 0

  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors duration-300 hover:bg-surface/40"
      >
        <span className="font-heading text-lg font-semibold text-off-white">{raid.name}</span>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-medium text-gold">{killed}/{total}</span>
          <div className="h-3 w-32 overflow-hidden rounded-full bg-surface">
            <div
              data-testid="progress-bar-fill"
              className="h-full animate-progress rounded-full bg-gradient-to-r from-gold to-gold-light"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-muted">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>
      {isExpanded && (
        <div data-testid="boss-list" className="border-t border-gold/10">
          {raid.bosses.map((boss) => (
            <BossRow key={boss.name} boss={boss} />
          ))}
        </div>
      )}
    </div>
  )
}
