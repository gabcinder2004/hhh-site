'use client'

import { useEffect } from 'react'
import { sanityImageUrl } from '@/lib/sanity/image'
import type { GalleryImage } from '@/lib/sanity/types'

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen) return null

  const current = images[currentIndex]

  return (
    <div
      data-testid="lightbox-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0b0e]/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-scale-fade-in relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute -top-10 right-0 text-2xl text-off-white/80 transition-colors duration-300 hover:text-gold"
        >
          X
        </button>

        <button
          onClick={onPrev}
          aria-label="Previous image"
          className="absolute left-[-3rem] top-1/2 -translate-y-1/2 text-3xl text-off-white/60 transition-colors duration-300 hover:text-gold"
        >
          &lsaquo;
        </button>

        <img
          src={sanityImageUrl(current.image)}
          alt={current.caption || 'Gallery image'}
          className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-[0_0_40px_rgba(0,0,0,0.5)]"
        />

        <button
          onClick={onNext}
          aria-label="Next image"
          className="absolute right-[-3rem] top-1/2 -translate-y-1/2 text-3xl text-off-white/60 transition-colors duration-300 hover:text-gold"
        >
          &rsaquo;
        </button>

        <div className="mt-4 text-center">
          {current.caption && (
            <p className="text-off-white">{current.caption}</p>
          )}
          <p className="font-mono text-sm text-muted">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  )
}
