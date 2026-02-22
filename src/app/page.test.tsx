import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock Sanity image URL builder
vi.mock('@/lib/sanity/image', () => ({
  urlForImage: () => ({
    width: () => ({
      height: () => ({
        url: () => 'https://cdn.sanity.io/test.png',
      }),
    }),
  }),
}))

// Mock Sanity client to avoid projectId error
vi.mock('@/lib/sanity/client', () => ({
  isSanityConfigured: true,
  client: {
    fetch: vi.fn(),
  },
}))

import type { Post } from '@/lib/sanity/types'

const mockPosts: (Post & { preview: string })[] = [
  {
    _id: 'post-1',
    _type: 'post',
    title: 'Latest News Post',
    slug: { current: 'latest-news-post' },
    author: 'Thrall',
    date: '2026-02-20T12:00:00Z',
    category: 'Announcement',
    body: [],
    published: true,
    preview: 'This is the latest news...',
  },
  {
    _id: 'post-2',
    _type: 'post',
    title: 'Older News Post',
    slug: { current: 'older-news-post' },
    author: 'Jaina',
    date: '2026-02-10T12:00:00Z',
    category: 'Event',
    body: [],
    published: true,
    preview: 'This is older news...',
  },
]

describe('Home Page', () => {
  it('renders the Hero section', async () => {
    const { client } = await import('@/lib/sanity/client')
    vi.mocked(client.fetch).mockResolvedValue(mockPosts)

    const { default: Home } = await import('./page')
    const result = await Home()
    render(result)

    expect(screen.getByRole('heading', { name: /Happy Hour Heroes/i })).toBeInTheDocument()
  })

  it('renders post cards for fetched posts', async () => {
    const { client } = await import('@/lib/sanity/client')
    vi.mocked(client.fetch).mockResolvedValue(mockPosts)

    const { default: Home } = await import('./page')
    const result = await Home()
    render(result)

    expect(screen.getByText('Latest News Post')).toBeInTheDocument()
    expect(screen.getByText('Older News Post')).toBeInTheDocument()
  })

  it('renders posts in the order returned (newest first)', async () => {
    const { client } = await import('@/lib/sanity/client')
    vi.mocked(client.fetch).mockResolvedValue(mockPosts)

    const { default: Home } = await import('./page')
    const result = await Home()
    render(result)

    const titles = screen.getAllByRole('heading', { level: 3 })
    expect(titles[0]).toHaveTextContent('Latest News Post')
    expect(titles[1]).toHaveTextContent('Older News Post')
  })

  it('renders a News heading for the feed section', async () => {
    const { client } = await import('@/lib/sanity/client')
    vi.mocked(client.fetch).mockResolvedValue(mockPosts)

    const { default: Home } = await import('./page')
    const result = await Home()
    render(result)

    expect(screen.getByRole('heading', { name: /news/i, level: 2 })).toBeInTheDocument()
  })

  it('shows an empty state message when no posts exist', async () => {
    const { client } = await import('@/lib/sanity/client')
    vi.mocked(client.fetch).mockResolvedValue([])

    const { default: Home } = await import('./page')
    const result = await Home()
    render(result)

    expect(screen.getByText(/no posts/i)).toBeInTheDocument()
  })
})
