import { Rating } from '@deanslist-platform/api-rating-data-access'

export function calculateAverage(ratings: Rating[]) {
  if (!ratings.length) {
    return null
  }
  const total = ratings.reduce((acc, rating) => acc + rating.rating, 0) ?? 0

  return Math.round((total / ratings.length) * 100) / 100
}
