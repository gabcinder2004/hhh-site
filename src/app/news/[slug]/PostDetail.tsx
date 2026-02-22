import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { Post } from '@/lib/sanity/types'

interface PostDetailProps {
  post: Post
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

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-block font-heading text-sm tracking-wide text-gold transition-colors duration-300 hover:text-gold-light"
      >
        &larr; Back to news
      </Link>
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryStyles[post.category]}`}>
            {post.category}
          </span>
          <span className="font-mono text-sm text-muted">
            {formatDate(post.date)}
          </span>
        </div>
        <h1 className="mb-2 font-heading text-4xl font-bold text-off-white">
          {post.title}
        </h1>
        <p className="text-muted">by {post.author}</p>
      </header>
      <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:text-off-white prose-p:text-off-white/80 prose-a:text-gold prose-strong:text-off-white">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}
