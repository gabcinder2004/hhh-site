export const postsQuery = `*[_type == "post" && published == true] | order(date desc) {
  _id,
  title,
  slug,
  author,
  date,
  category,
  thumbnail,
  "preview": array::join(string::split(pt::text(body), "")[0..200], "") + "...",
  published
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author,
  date,
  category,
  thumbnail,
  body,
  published
}`

export const raidsQuery = `*[_type == "raid"] | order(order asc) {
  _id,
  name,
  order,
  bosses
}`

export const galleryImagesQuery = `*[_type == "galleryImage"] | order(date desc) {
  _id,
  image,
  caption,
  date,
  tags,
  uploadedBy
}`

export const galleryImagesByTagQuery = `*[_type == "galleryImage" && $tag in tags] | order(date desc) {
  _id,
  image,
  caption,
  date,
  tags,
  uploadedBy
}`

export const guildInfoQuery = `*[_type == "guildInfo"][0] {
  _id,
  description,
  discordLink,
  officers
}`
