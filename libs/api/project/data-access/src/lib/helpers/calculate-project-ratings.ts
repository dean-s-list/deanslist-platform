import { Rating } from '@deanslist-platform/api-rating-data-access'

export function calculateProjectRatings(ratings: Rating[]) {
  if (!ratings.length) {
    return null
  }
  const total = ratings.reduce((acc, rating) => acc + rating.rating, 0) ?? 0

  return Math.round((total / ratings.length) * 100) / 100
}

export function getCommentRatings(comments: { ratings: Rating[] }[] = []): Rating[] {
  return (comments?.map((comment) => comment.ratings).flat() ?? []) as Rating[]
}
