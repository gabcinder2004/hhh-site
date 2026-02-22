'use client'

interface TagFilterProps {
  tags: string[]
  activeTag: string | null
  onTagSelect: (tag: string | null) => void
}

export default function TagFilter({ tags, activeTag, onTagSelect }: TagFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        onClick={() => onTagSelect(null)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
          activeTag === null
            ? 'bg-gradient-to-r from-gold to-gold-light text-[#0d0b0e] shadow-[0_0_12px_rgba(201,168,76,0.2)]'
            : 'border border-gold/20 text-off-white/80 hover:border-gold/40 hover:bg-gold/5'
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
            activeTag === tag
              ? 'bg-gradient-to-r from-gold to-gold-light text-[#0d0b0e] shadow-[0_0_12px_rgba(201,168,76,0.2)]'
              : 'border border-gold/20 text-off-white/80 hover:border-gold/40 hover:bg-gold/5'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
