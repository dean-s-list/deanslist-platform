import slugify from 'slugify'

export function slugifyId(id: string, lower = false): string {
  return slugify(id, { lower, strict: true })
}

export function slugifyUsername(id: string): string {
  return slugify(id, { lower: false, strict: false })
}
