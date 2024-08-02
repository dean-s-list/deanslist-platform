export function getRatingAverage(ratings: number[] = []) {
  if (!ratings.length) {
    return null
  }
  const total = ratings.reduce((acc, rating) => acc + rating, 0) ?? 0

  return Math.round((total / ratings.length) * 100) / 100
}
