import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GalleryGrid from './GalleryGrid'
import type { GalleryImage } from '@/lib/sanity/types'

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
    caption: 'First kill screenshot',
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
  {
    _id: 'img-3',
    _type: 'galleryImage',
    image: { _type: 'image', asset: { _ref: 'image-ghi-400x400-png', _type: 'reference' } },
    caption: 'Guild meeting',
    date: '2025-10-03',
    tags: ['Social'],
    uploadedBy: 'Frodo',
  },
]

describe('GalleryGrid', () => {
  const onImageClick = vi.fn()

  it('renders all images', () => {
    render(<GalleryGrid images={mockImages} onImageClick={onImageClick} />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
  })

  it('shows captions when present', () => {
    render(<GalleryGrid images={mockImages} onImageClick={onImageClick} />)
    expect(screen.getByText('First kill screenshot')).toBeInTheDocument()
    expect(screen.getByText('Guild meeting')).toBeInTheDocument()
  })

  it('shows uploadedBy when present', () => {
    render(<GalleryGrid images={mockImages} onImageClick={onImageClick} />)
    expect(screen.getByText(/Gandalf/)).toBeInTheDocument()
    expect(screen.getByText(/Frodo/)).toBeInTheDocument()
  })

  it('calls onImageClick with the image index when clicked', async () => {
    const user = userEvent.setup()
    render(<GalleryGrid images={mockImages} onImageClick={onImageClick} />)
    const images = screen.getAllByRole('img')
    await user.click(images[1])
    expect(onImageClick).toHaveBeenCalledWith(1)
  })

  it('uses masonry-style CSS columns layout', () => {
    render(<GalleryGrid images={mockImages} onImageClick={onImageClick} />)
    const grid = screen.getByTestId('gallery-grid')
    expect(grid.className).toMatch(/columns-1/)
  })
})
