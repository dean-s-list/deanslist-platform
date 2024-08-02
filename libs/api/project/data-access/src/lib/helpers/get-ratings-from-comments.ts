export function getRatingsFromComments(comments: { ratings: { rating: number }[] }[] = []): number[] {
  const flat: { rating: number }[] =
    comments
      .filter(Boolean)
      .map(({ ratings }) => ratings)
      .flat() ?? []

  return flat.map(({ rating }) => rating)
}
