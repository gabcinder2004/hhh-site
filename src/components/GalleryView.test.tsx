import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GalleryView from './GalleryView'
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
    caption: 'Raid night',
    date: '2025-10-01',
    tags: ['Raid', 'PvE'],
    uploadedBy: 'Gandalf',
  },
  {
    _id: 'img-2',
    _type: 'galleryImage',
    image: { _type: 'image', asset: { _ref: 'image-def-300x300-png', _type: 'reference' } },
    caption: 'Arena match',
    date: '2025-10-02',
    tags: ['PvP'],
  },
  {
    _id: 'img-3',
    _type: 'galleryImage',
    image: { _type: 'image', asset: { _ref: 'image-ghi-400x400-png', _type: 'reference' } },
    caption: 'Guild photo',
    date: '2025-10-03',
    tags: ['Social'],
    uploadedBy: 'Frodo',
  },
]

describe('GalleryView', () => {
  it('renders all images when no tag is selected', () => {
    render(<GalleryView images={mockImages} />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
  })

  it('renders unique tag filter buttons', () => {
    render(<GalleryView images={mockImages} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Raid' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'PvP' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'PvE' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Social' })).toBeInTheDocument()
  })

  it('filters images when a tag is clicked', async () => {
    const user = userEvent.setup()
    render(<GalleryView images={mockImages} />)

    await user.click(screen.getByRole('button', { name: 'PvP' }))

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(1)
    expect(screen.getByText('Arena match')).toBeInTheDocument()
  })

  it('shows all images when "All" is clicked after filtering', async () => {
    const user = userEvent.setup()
    render(<GalleryView images={mockImages} />)

    await user.click(screen.getByRole('button', { name: 'PvP' }))
    expect(screen.getAllByRole('img')).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'All' }))
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('opens lightbox when an image is clicked', async () => {
    const user = userEvent.setup()
    render(<GalleryView images={mockImages} />)

    const images = screen.getAllByRole('img')
    await user.click(images[0])

    expect(screen.getByTestId('lightbox-overlay')).toBeInTheDocument()
  })

  it('closes lightbox when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<GalleryView images={mockImages} />)

    const images = screen.getAllByRole('img')
    await user.click(images[0])
    expect(screen.getByTestId('lightbox-overlay')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByTestId('lightbox-overlay')).not.toBeInTheDocument()
  })

  it('navigates lightbox with arrow keys', async () => {
    const user = userEvent.setup()
    render(<GalleryView images={mockImages} />)

    const images = screen.getAllByRole('img')
    await user.click(images[0])

    expect(screen.getByText('1 / 3')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'ArrowRight' })
    expect(screen.getByText('2 / 3')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'ArrowLeft' })
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('shows empty state when no images are provided', () => {
    render(<GalleryView images={[]} />)
    expect(screen.getByText('No screenshots uploaded yet.')).toBeInTheDocument()
  })
})
