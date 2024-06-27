import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetCommunityManagers({ communityId }: { communityId: string }) {
  const sdk = useSdk()

  const query = useQuery({
    queryKey: ['manager', 'get-community-managers', { communityId }],
    queryFn: () => sdk.managerGetCommunityManagers({ communityId }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
