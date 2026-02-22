import { client } from '@/lib/sanity/client'
import { galleryImagesQuery } from '@/lib/sanity/queries'
import type { GalleryImage } from '@/lib/sanity/types'
import GalleryView from '@/components/GalleryView'

export default async function GalleryPage() {
  const images: GalleryImage[] = await client.fetch(galleryImagesQuery)

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-off-white">Gallery</h1>
      <GalleryView images={images} />
    </div>
  )
}
