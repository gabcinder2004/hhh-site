import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// Mock @portabletext/react
vi.mock('@portabletext/react', () => ({
  PortableText: ({ value }: { value: unknown[] }) => (
    <div data-testid="portable-text">{value.length} block(s)</div>
  ),
}))

// Mock Sanity client
vi.mock('@/lib/sanity/client', () => ({
  client: {
    fetch: vi.fn(),
  },
}))

import type { Post } from '@/lib/sanity/types'

const mockPost: Post = {
  _id: 'post-1',
  _type: 'post',
  title: 'Guild First: Ragnaros Down!',
  slug: { current: 'guild-first-ragnaros-down' },
  author: 'Thrall',
  date: '2026-02-15T12:00:00Z',
  category: 'Raid Kill',
  body: [
    {
      _type: 'block',
      _key: 'block1',
      children: [{ _type: 'span', _key: 'span1', text: 'We did it!', marks: [] }],
      markDefs: [],
      style: 'normal',
    },
  ],
  published: true,
}

describe('Post [slug] page', () => {
  it('renders the post when found', async () => {
    const { client } = await import('@/lib/sanity/client')
    vi.mocked(client.fetch).mockResolvedValue(mockPost)

    const { default: PostPage } = await import('./page')
    const result = await PostPage({ params: Promise.resolve({ slug: 'guild-first-ragnaros-down' }) })
    render(result)

    expect(screen.getByRole('heading', { name: /Guild First: Ragnaros Down!/i })).toBeInTheDocument()
    expect(screen.getByText(/Thrall/)).toBeInTheDocument()
    expect(screen.getByText('Raid Kill')).toBeInTheDocument()
    expect(screen.getByTestId('portable-text')).toBeInTheDocument()
  })

  it('calls notFound for an invalid slug', async () => {
    const { client } = await import('@/lib/sanity/client')
    vi.mocked(client.fetch).mockResolvedValue(null)

    const { default: PostPage } = await import('./page')

    // notFound() throws a NEXT_NOT_FOUND error in Next.js
    await expect(
      PostPage({ params: Promise.resolve({ slug: 'nonexistent' }) })
    ).rejects.toThrow()
  })

  it('renders a back link to home', async () => {
    const { client } = await import('@/lib/sanity/client')
    vi.mocked(client.fetch).mockResolvedValue(mockPost)

    const { default: PostPage } = await import('./page')
    const result = await PostPage({ params: Promise.resolve({ slug: 'guild-first-ragnaros-down' }) })
    render(result)

    const backLink = screen.getByRole('link', { name: /back/i })
    expect(backLink).toHaveAttribute('href', '/')
  })
})
