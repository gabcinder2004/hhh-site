'use client'

import { CLASS_ORDER, CLASS_COLORS, CLASS_ICONS, CLASS_NAMES } from '@/lib/classData'

interface ClassFilterProps {
  activeClass: string | null
  onClassSelect: (classKey: string | null) => void
}

export default function ClassFilter({ activeClass, onClassSelect }: ClassFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <button
        onClick={() => onClassSelect(null)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
          activeClass === null
            ? 'bg-gradient-to-r from-gold to-gold-light text-[#0d0b0e] shadow-[0_0_12px_rgba(201,168,76,0.2)]'
            : 'border border-gold/20 text-off-white/80 hover:border-gold/40 hover:bg-gold/5'
        }`}
      >
        All
      </button>
      {CLASS_ORDER.map((cls) => {
        const isActive = activeClass === cls
        const color = CLASS_COLORS[cls]
        return (
          <button
            key={cls}
            onClick={() => onClassSelect(isActive ? null : cls)}
            aria-label={CLASS_NAMES[cls]}
            aria-pressed={isActive}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-base transition-all duration-300 ${
              isActive
                ? 'scale-110 shadow-[0_0_14px_var(--glow-color)]'
                : 'opacity-40 hover:opacity-100 hover:shadow-[0_0_10px_var(--glow-color)]'
            }`}
            style={
              {
                backgroundColor: color,
                '--glow-color': color,
              } as React.CSSProperties
            }
          >
            {CLASS_ICONS[cls]}
          </button>
        )
      })}
    </div>
  )
}
