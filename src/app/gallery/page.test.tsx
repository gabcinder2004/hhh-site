import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import GalleryPage from './page'
import type { GalleryImage } from '@/lib/sanity/types'

// Mock the Sanity client
const mockFetch = vi.fn()
vi.mock('@/lib/sanity/client', () => ({
  isSanityConfigured: true,
  client: { fetch: (...args: unknown[]) => mockFetch(...args) },
}))

// Mock the sanity image helper
vi.mock('@/lib/sanity/image', () => ({
  sanityImageUrl: (image: { asset: { _ref: string } }) =>
    `https://cdn.sanity.io/images/test/${image.asset._ref}`,
}))

const mockImages: GalleryImage[] = [
  {
    _id: 'img-1',
    _type: 'galleryImage',
    image: { _type: 'image', asset: { _ref: 'image-abc-200x200-png', _type: 'reference' } },
    caption: 'Raid night',
    date: '2025-10-01',
    tags: ['Raid'],
    uploadedBy: 'Gandalf',
  },
  {
    _id: 'img-2',
    _type: 'galleryImage',
    image: { _type: 'image', asset: { _ref: 'image-def-300x300-png', _type: 'reference' } },
    date: '2025-10-02',
    tags: ['PvP'],
  },
]

describe('GalleryPage', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders the page heading', async () => {
    mockFetch.mockResolvedValue(mockImages)
    render(await GalleryPage())
    expect(screen.getByRole('heading', { name: /Gallery/i })).toBeInTheDocument()
  })

  it('renders gallery images', async () => {
    mockFetch.mockResolvedValue(mockImages)
    render(await GalleryPage())
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
  })

  it('shows empty state when no images exist', async () => {
    mockFetch.mockResolvedValue([])
    render(await GalleryPage())
    expect(screen.getByText('No screenshots uploaded yet.')).toBeInTheDocument()
  })
})
