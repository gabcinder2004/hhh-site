import { describe, it, expect } from 'vitest'
import { postsQuery, postBySlugQuery, raidsQuery, galleryImagesQuery, guildInfoQuery } from './queries'

describe('GROQ queries', () => {
  it('postsQuery filters by published and orders by date desc', () => {
    expect(postsQuery).toContain('published == true')
    expect(postsQuery).toContain('order(date desc)')
  })

  it('postBySlugQuery filters by slug parameter', () => {
    expect(postBySlugQuery).toContain('slug.current == $slug')
  })

  it('raidsQuery orders by order asc', () => {
    expect(raidsQuery).toContain('order(order asc)')
  })

  it('galleryImagesQuery orders by date desc', () => {
    expect(galleryImagesQuery).toContain('order(date desc)')
  })

  it('guildInfoQuery fetches singleton', () => {
    expect(guildInfoQuery).toContain('[0]')
  })
})
