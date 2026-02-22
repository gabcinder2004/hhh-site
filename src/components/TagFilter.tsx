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
        className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${
          activeTag === null
            ? 'bg-gold text-navy'
            : 'border border-royal-blue text-off-white hover:bg-royal-blue/20'
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${
            activeTag === tag
              ? 'bg-gold text-navy'
              : 'border border-royal-blue text-off-white hover:bg-royal-blue/20'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
