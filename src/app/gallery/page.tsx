import { client, isSanityConfigured } from '@/lib/sanity/client'
import { galleryImagesQuery } from '@/lib/sanity/queries'
import type { GalleryImage } from '@/lib/sanity/types'
import GalleryView from '@/components/GalleryView'

export default async function GalleryPage() {
  let images: GalleryImage[] = []
  if (isSanityConfigured) {
    try {
      images = await client.fetch(galleryImagesQuery)
    } catch { /* Sanity not available */ }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-shimmer mb-8 font-display text-3xl font-bold md:text-4xl">Gallery</h1>
      <GalleryView images={images} />
    </div>
  )
}
