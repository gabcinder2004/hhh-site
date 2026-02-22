import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { Post } from '@/lib/sanity/types'

interface PostDetailProps {
  post: Post
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

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-gold hover:text-gold/80"
      >
        &larr; Back to news
      </Link>
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span className={`rounded px-2 py-0.5 text-xs font-medium ${categoryStyles[post.category]}`}>
            {post.category}
          </span>
          <span className="text-sm text-off-white/60">
            {formatDate(post.date)}
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-bold text-off-white">
          {post.title}
        </h1>
        <p className="text-off-white/60">by {post.author}</p>
      </header>
      <div className="prose prose-invert max-w-none prose-headings:text-off-white prose-p:text-off-white/80 prose-a:text-gold prose-strong:text-off-white">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}
