import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetCommunityMembers({ communityId }: { communityId: string }) {
  const sdk = useSdk()

  const query = useQuery({
    queryKey: ['manager', 'get-community-members', { communityId }],
    queryFn: () => sdk.managerGetCommunityMembers({ communityId }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
