import { sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetCommunityManagers({ communityId }: { communityId: string }) {
  const query = useQuery({
    queryKey: ['admin', 'get-community-managers', { communityId }],
    queryFn: () => sdk.adminGetCommunityManagers({ communityId }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
