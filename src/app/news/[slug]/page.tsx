import { notFound } from 'next/navigation'
import { client, isSanityConfigured } from '@/lib/sanity/client'
import { postBySlugQuery, postsQuery } from '@/lib/sanity/queries'
import type { Post } from '@/lib/sanity/types'
import PostDetail from './PostDetail'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (!isSanityConfigured) return []
  const posts = await client.fetch<Post[]>(postsQuery)
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug })

  if (!post) {
    notFound()
  }

  return <PostDetail post={post} />
}
