import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetCommunityMembers({ communityId }: { communityId: string }) {
  const sdk = useSdk()

  const query = useQuery({
    queryKey: ['admin', 'get-community-members', { communityId }],
    queryFn: () => sdk.adminGetCommunityMembers({ communityId }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
