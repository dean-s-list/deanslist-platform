export function getRatingAverages(items: { id: string; ratings: number[] }[], total: number, unit = 5) {
  // We want to know how much total value there is
  const ratingValue = items
    .map(({ ratings }) => ratings.reduce((sum, rating) => sum + rating, 0))
    .reduce((acc, value) => acc + value, 0)

  // Take the unit into account for rounding down
  const amountPerRating = Math.floor(total / ratingValue / unit) * unit

  const result: Record<string, number> = items.reduce(
    (acc, { id, ratings }) => ({
      ...acc,
      [id]: ratings.reduce((sum, rating) => sum + rating * amountPerRating, 0),
    }),
    {},
  )

  return result
}
