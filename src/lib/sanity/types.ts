import type { PortableTextBlock } from 'next-sanity'

export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: { current: string }
  author: string
  date: string
  category: 'Raid Kill' | 'Event' | 'Announcement' | 'Competition'
  thumbnail?: SanityImage
  body: PortableTextBlock[]
  published: boolean
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface Boss {
  name: string
  killed: boolean
  killDate?: string
  killScreenshot?: SanityImage
}

export interface Raid {
  _id: string
  _type: 'raid'
  name: string
  order: number
  bosses: Boss[]
}

export interface GalleryImage {
  _id: string
  _type: 'galleryImage'
  image: SanityImage
  caption?: string
  date: string
  tags: string[]
  uploadedBy?: string
}

export interface Officer {
  name: string
  role: string
}

export interface GuildInfo {
  _id: string
  _type: 'guildInfo'
  description: PortableTextBlock[]
  discordLink?: string
  officers: Officer[]
}
