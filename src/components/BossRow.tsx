import type { Boss } from '@/lib/sanity/types'

interface BossRowProps {
  boss: Boss
}

export default function BossRow({ boss }: BossRowProps) {
  return (
    <div
      data-testid="boss-row"
      className={`flex items-center justify-between border-b border-royal-blue/20 px-4 py-2 ${
        boss.killed ? 'text-off-white' : 'text-gray-500'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          data-testid="boss-status-icon"
          className={boss.killed ? 'text-gold font-bold' : 'text-gray-600'}
        >
          {boss.killed ? '✓' : '–'}
        </span>
        <span>{boss.name}</span>
      </div>
      {boss.killed && boss.killDate && (
        <span className="text-sm text-off-white/50">{boss.killDate}</span>
      )}
    </div>
  )
}
