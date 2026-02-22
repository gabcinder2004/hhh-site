import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PostDetail from './PostDetail'
import type { Post } from '@/lib/sanity/types'

// Mock @portabletext/react
vi.mock('@portabletext/react', () => ({
  PortableText: ({ value }: { value: unknown[] }) => (
    <div data-testid="portable-text">{value.length} block(s)</div>
  ),
}))

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

describe('PostDetail', () => {
  it('renders the post title as a heading', () => {
    render(<PostDetail post={mockPost} />)
    expect(screen.getByRole('heading', { name: /Guild First: Ragnaros Down!/i })).toBeInTheDocument()
  })

  it('renders the author', () => {
    render(<PostDetail post={mockPost} />)
    expect(screen.getByText(/Thrall/)).toBeInTheDocument()
  })

  it('renders the formatted date', () => {
    render(<PostDetail post={mockPost} />)
    expect(screen.getByText(/Feb/)).toBeInTheDocument()
    expect(screen.getByText(/2026/)).toBeInTheDocument()
  })

  it('renders the category', () => {
    render(<PostDetail post={mockPost} />)
    expect(screen.getByText('Raid Kill')).toBeInTheDocument()
  })

  it('renders the body using PortableText', () => {
    render(<PostDetail post={mockPost} />)
    expect(screen.getByTestId('portable-text')).toBeInTheDocument()
  })

  it('renders a back link to the home page', () => {
    render(<PostDetail post={mockPost} />)
    const backLink = screen.getByRole('link', { name: /back/i })
    expect(backLink).toHaveAttribute('href', '/')
  })
})
