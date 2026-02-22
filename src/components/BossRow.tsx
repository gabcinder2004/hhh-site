import type { Boss } from '@/lib/sanity/types'

interface BossRowProps {
  boss: Boss
}

export default function BossRow({ boss }: BossRowProps) {
  return (
    <div
      data-testid="boss-row"
      className={`flex items-center justify-between border-b border-gold/5 px-4 py-2.5 ${
        boss.killed ? 'text-off-white' : 'text-muted'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          data-testid="boss-status-icon"
          className={boss.killed ? 'text-gold font-bold' : 'text-muted'}
        >
          {boss.killed ? '✓' : '–'}
        </span>
        <span>{boss.name}</span>
      </div>
      {boss.killed && boss.killDate && (
        <span className="font-mono text-sm text-muted">{boss.killDate}</span>
      )}
    </div>
  )
}
