import { sanityImageUrl } from '@/lib/sanity/image'
import type { GalleryImage } from '@/lib/sanity/types'

interface GalleryGridProps {
  images: GalleryImage[]
  onImageClick: (index: number) => void
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div
      data-testid="gallery-grid"
      className="columns-1 gap-4 md:columns-2 lg:columns-3"
    >
      {images.map((image, index) => (
        <div key={image._id} className="mb-4 break-inside-avoid">
          <img
            src={sanityImageUrl(image.image)}
            alt={image.caption || 'Gallery image'}
            className="w-full cursor-pointer rounded-lg"
            onClick={() => onImageClick(index)}
          />
          {(image.caption || image.uploadedBy) && (
            <div className="mt-1 px-1">
              {image.caption && (
                <p className="text-sm text-off-white">{image.caption}</p>
              )}
              {image.uploadedBy && (
                <p className="text-xs text-off-white/50">by {image.uploadedBy}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
