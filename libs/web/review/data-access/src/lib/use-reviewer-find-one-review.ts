import { sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useReviewerFindOneReview({ reviewId }: { reviewId: string }) {
  const query = useQuery({
    queryKey: ['reviewer', 'find-one-review', reviewId],
    queryFn: () => sdk.reviewerFindOneReview({ reviewId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
