import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneReview({ reviewId }: { reviewId: string }) {
  const sdk = useSdk()
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
