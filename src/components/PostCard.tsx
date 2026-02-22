import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/sanity/types'
import { urlForImage } from '@/lib/sanity/image'

interface PostCardProps {
  post: Post & { preview?: string }
}

const categoryStyles: Record<Post['category'], string> = {
  'Raid Kill': 'bg-red-900/60 text-red-200',
  'Event': 'bg-purple-900/60 text-purple-200',
  'Announcement': 'bg-blue-900/60 text-blue-200',
  'Competition': 'bg-green-900/60 text-green-200',
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/news/${post.slug.current}`}
      className="group block overflow-hidden rounded-lg border border-royal-blue/30 bg-royal-blue/10 transition-colors hover:border-gold/50"
    >
      {post.thumbnail && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={urlForImage(post.thumbnail).width(600).height(300).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className={`rounded px-2 py-0.5 text-xs font-medium ${categoryStyles[post.category]}`}>
            {post.category}
          </span>
          <span className="text-sm text-off-white/60">
            {formatDate(post.date)}
          </span>
        </div>
        <h3 className="mb-1 text-lg font-semibold text-off-white group-hover:text-gold">
          {post.title}
        </h3>
        <p className="mb-2 text-sm text-off-white/60">by {post.author}</p>
        {post.preview && (
          <p className="text-sm leading-relaxed text-off-white/70">
            {post.preview}
          </p>
        )}
      </div>
    </Link>
  )
}
