import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImage } from './types'

const builder = imageUrlBuilder(client)

export function urlForImage(source: SanityImage) {
  return builder.image(source)
}

export function sanityImageUrl(image: SanityImage): string {
  return builder.image(image).url()
}
