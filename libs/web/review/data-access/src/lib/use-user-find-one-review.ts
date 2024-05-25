import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneReview({ reviewId }: { reviewId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-review', reviewId],
    queryFn: () => sdk.userFindOneReview({ reviewId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
