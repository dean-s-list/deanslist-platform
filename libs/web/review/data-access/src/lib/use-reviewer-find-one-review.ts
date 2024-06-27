import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useReviewerFindOneReview({ reviewId }: { reviewId: string }) {
  const sdk = useSdk()
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
