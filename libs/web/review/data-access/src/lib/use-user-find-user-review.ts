import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindUserProjectReview({ projectId }: { projectId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-user-review', projectId],
    queryFn: () => sdk.userFindUserProjectReview({ projectId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
