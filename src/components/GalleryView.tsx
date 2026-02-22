'use client'

import { useState, useCallback, useMemo } from 'react'
import type { GalleryImage } from '@/lib/sanity/types'
import TagFilter from './TagFilter'
import GalleryGrid from './GalleryGrid'
import Lightbox from './Lightbox'

interface GalleryViewProps {
  images: GalleryImage[]
}

export default function GalleryView({ images }: GalleryViewProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const uniqueTags = useMemo(() => {
    const tagSet = new Set<string>()
    images.forEach((img) => img.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet)
  }, [images])

  const filteredImages = useMemo(() => {
    if (!activeTag) return images
    return images.filter((img) => img.tags.includes(activeTag))
  }, [images, activeTag])

  const handleImageClick = useCallback((index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : prev))
  }, [filteredImages.length])

  if (images.length === 0) {
    return <p className="text-off-white/50">No screenshots uploaded yet.</p>
  }

  return (
    <>
      <TagFilter tags={uniqueTags} activeTag={activeTag} onTagSelect={setActiveTag} />
      <GalleryGrid images={filteredImages} onImageClick={handleImageClick} />
      <Lightbox
        images={filteredImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  )
}
