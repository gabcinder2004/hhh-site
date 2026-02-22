import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Lightbox from './Lightbox'
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
    caption: 'First kill',
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
  },
]

describe('Lightbox', () => {
  const onClose = vi.fn()
  const onPrev = vi.fn()
  const onNext = vi.fn()

  it('does not render when isOpen is false', () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        isOpen={false}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
    expect(screen.queryByTestId('lightbox-overlay')).not.toBeInTheDocument()
  })

  it('renders the overlay when isOpen is true', () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        isOpen={true}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
    expect(screen.getByTestId('lightbox-overlay')).toBeInTheDocument()
  })

  it('displays the current image', () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        isOpen={true}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', expect.stringContaining('image-abc'))
  })

  it('shows the caption when present', () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        isOpen={true}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
    expect(screen.getByText('First kill')).toBeInTheDocument()
  })

  it('shows the image count', () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={2}
        isOpen={true}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
    expect(screen.getByText('3 / 3')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        isOpen={true}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
    await user.click(screen.getByLabelText('Close lightbox'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onPrev when previous button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Lightbox
        images={mockImages}
        currentIndex={1}
        isOpen={true}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
    await user.click(screen.getByLabelText('Previous image'))
    expect(onPrev).toHaveBeenCalled()
  })

  it('calls onNext when next button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        isOpen={true}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
    await user.click(screen.getByLabelText('Next image'))
    expect(onNext).toHaveBeenCalled()
  })

  it('calls onClose when Escape key is pressed', () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        isOpen={true}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onPrev when ArrowLeft key is pressed', () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={1}
        isOpen={true}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
    fireEvent.keyDown(document, { key: 'ArrowLeft' })
    expect(onPrev).toHaveBeenCalled()
  })

  it('calls onNext when ArrowRight key is pressed', () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        isOpen={true}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
      />
    )
    fireEvent.keyDown(document, { key: 'ArrowRight' })
    expect(onNext).toHaveBeenCalled()
  })
})
