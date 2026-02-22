'use client'

import { useState } from 'react'
import type { Raid } from '@/lib/sanity/types'
import RaidTier from './RaidTier'

interface RaidProgressListProps {
  raids: Raid[]
}

export default function RaidProgressList({ raids }: RaidProgressListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    raids.length > 0 ? 0 : null
  )

  if (raids.length === 0) {
    return <p className="text-muted">No raid progress recorded yet.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {raids.map((raid, index) => (
        <RaidTier
          key={raid._id}
          raid={raid}
          isExpanded={expandedIndex === index}
          onToggle={() =>
            setExpandedIndex(expandedIndex === index ? null : index)
          }
        />
      ))}
    </div>
  )
}
