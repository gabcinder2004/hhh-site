import Hero from '@/components/Hero'
import PostCard from '@/components/PostCard'
import { client } from '@/lib/sanity/client'
import { postsQuery } from '@/lib/sanity/queries'
import type { Post } from '@/lib/sanity/types'

export default async function Home() {
  const posts = await client.fetch<(Post & { preview: string })[]>(postsQuery)

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="mb-8 text-3xl font-bold text-off-white">Latest News</h2>
        {posts.length === 0 ? (
          <p className="text-off-white/60">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
