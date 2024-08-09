import { sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneReview({ reviewId }: { reviewId: string }) {
  const query = useQuery({
    queryKey: ['admin', 'find-one-review', reviewId],
    queryFn: () => sdk.adminFindOneReview({ reviewId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
