import Hero from '@/components/Hero'
import PostCard from '@/components/PostCard'
import { client, isSanityConfigured } from '@/lib/sanity/client'
import { postsQuery } from '@/lib/sanity/queries'
import type { Post } from '@/lib/sanity/types'

export default async function Home() {
  let posts: (Post & { preview: string })[] = []
  if (isSanityConfigured) {
    try {
      posts = await client.fetch<(Post & { preview: string })[]>(postsQuery)
    } catch { /* Sanity not available */ }
  }

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-shimmer mb-10 font-heading text-3xl font-bold">Latest News</h2>
        {posts.length === 0 ? (
          <p className="text-muted">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-5">
            <div className={posts.length > 1 ? 'lg:col-span-3' : 'lg:col-span-5'}>
              <PostCard post={posts[0]} />
            </div>
            {posts.length > 1 && (
              <div className="flex flex-col gap-6 lg:col-span-2">
                {posts.slice(1).map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  )
}
