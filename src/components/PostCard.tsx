import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/sanity/types'
import { urlForImage } from '@/lib/sanity/image'

interface PostCardProps {
  post: Post & { preview?: string }
}

const categoryStyles: Record<Post['category'], string> = {
  'Raid Kill': 'bg-red-900/40 text-red-300',
  'Event': 'bg-purple-900/40 text-purple-300',
  'Announcement': 'bg-accent-blue/30 text-blue-300',
  'Competition': 'bg-green-900/40 text-green-300',
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
      className="glass-card group block overflow-hidden rounded-xl"
    >
      {post.thumbnail && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={urlForImage(post.thumbnail).width(600).height(300).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryStyles[post.category]}`}>
            {post.category}
          </span>
          <span className="font-mono text-xs text-muted">
            {formatDate(post.date)}
          </span>
        </div>
        <h3 className="mb-1 font-heading text-lg font-semibold text-off-white transition-colors duration-300 group-hover:text-gold-light">
          {post.title}
        </h3>
        <p className="mb-2 text-sm text-muted">by {post.author}</p>
        {post.preview && (
          <p className="text-sm leading-relaxed text-off-white/60">
            {post.preview}
          </p>
        )}
      </div>
    </Link>
  )
}
