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
    <div className="overflow-hidden rounded-lg border border-royal-blue/30 bg-navy/50">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-royal-blue/20"
      >
        <span className="text-lg font-semibold text-off-white">{raid.name}</span>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gold">{killed}/{total}</span>
          <div className="h-3 w-32 overflow-hidden rounded-full bg-royal-blue/30">
            <div
              data-testid="progress-bar-fill"
              className="h-full bg-gold transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-off-white/50">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>
      {isExpanded && (
        <div data-testid="boss-list" className="border-t border-royal-blue/20">
          {raid.bosses.map((boss) => (
            <BossRow key={boss.name} boss={boss} />
          ))}
        </div>
      )}
    </div>
  )
}
