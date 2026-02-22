import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PostCard from './PostCard'
import type { Post } from '@/lib/sanity/types'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock Sanity image URL builder
vi.mock('@/lib/sanity/image', () => ({
  urlForImage: () => ({
    width: () => ({
      height: () => ({
        url: () => 'https://cdn.sanity.io/images/test/production/test-image-300x200.png',
      }),
    }),
  }),
}))

const basePost: Post = {
  _id: 'post-1',
  _type: 'post',
  title: 'First Mythic Kill!',
  slug: { current: 'first-mythic-kill' },
  author: 'Thrall',
  date: '2026-02-15T12:00:00Z',
  category: 'Raid Kill',
  body: [],
  published: true,
}

const postWithPreview = { ...basePost, preview: 'We downed the boss after many attempts...' }

describe('PostCard', () => {
  it('renders the post title', () => {
    render(<PostCard post={postWithPreview} />)
    expect(screen.getByText('First Mythic Kill!')).toBeInTheDocument()
  })

  it('renders the author', () => {
    render(<PostCard post={postWithPreview} />)
    expect(screen.getByText(/Thrall/)).toBeInTheDocument()
  })

  it('renders the formatted date', () => {
    render(<PostCard post={postWithPreview} />)
    // Should display a human-readable date
    expect(screen.getByText(/Feb/)).toBeInTheDocument()
    expect(screen.getByText(/2026/)).toBeInTheDocument()
  })

  it('renders the category tag', () => {
    render(<PostCard post={postWithPreview} />)
    expect(screen.getByText('Raid Kill')).toBeInTheDocument()
  })

  it('renders preview text when available', () => {
    render(<PostCard post={postWithPreview} />)
    expect(screen.getByText('We downed the boss after many attempts...')).toBeInTheDocument()
  })

  it('links to the correct post slug', () => {
    render(<PostCard post={postWithPreview} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/news/first-mythic-kill')
  })

  it('does not render a thumbnail when none is provided', () => {
    render(<PostCard post={postWithPreview} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders a thumbnail when provided', () => {
    const postWithThumb = {
      ...postWithPreview,
      thumbnail: {
        _type: 'image' as const,
        asset: { _ref: 'image-abc123-300x200-png', _type: 'reference' as const },
      },
    }
    render(<PostCard post={postWithThumb} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('applies distinct styling for each category', () => {
    const categories: Post['category'][] = ['Raid Kill', 'Event', 'Announcement', 'Competition']
    const { unmount } = render(<PostCard post={{ ...postWithPreview, category: categories[0] }} />)
    const firstTag = screen.getByText('Raid Kill')
    const firstClasses = firstTag.className

    unmount()

    render(<PostCard post={{ ...postWithPreview, category: 'Event' }} />)
    const secondTag = screen.getByText('Event')
    const secondClasses = secondTag.className

    // Different categories should have different styling
    expect(firstClasses).not.toBe(secondClasses)
  })
})
