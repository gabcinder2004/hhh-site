'use client'

import { Children, type ReactNode } from 'react'

interface RankGroupProps {
  rankName: string
  children: ReactNode
  opacity?: number
}

export default function RankGroup({
  rankName,
  children,
  opacity = 1,
}: RankGroupProps) {
  if (!Children.count(children)) return null

  return (
    <div
      className="transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Ornamental divider with rank name */}
      <div className="mb-6 flex items-center justify-center gap-3">
        <span className="block h-px w-12 bg-gradient-to-r from-transparent to-gold/40 md:w-20" />
        <span className="block h-2 w-px bg-gold/20" />
        <span className="text-xs text-gold/50" aria-hidden="true">&#9830;</span>
        <h3 className="font-display uppercase tracking-[0.25em] text-gold text-sm">
          {rankName}
        </h3>
        <span className="text-xs text-gold/50" aria-hidden="true">&#9830;</span>
        <span className="block h-2 w-px bg-gold/20" />
        <span className="block h-px w-12 bg-gradient-to-l from-transparent to-gold/40 md:w-20" />
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  )
}
