import { sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetCommunityManager({ communityId }: { communityId: string }) {
  const query = useQuery({
    queryKey: ['manager', 'get-community-manager', { communityId }],
    queryFn: () => sdk.managerGetCommunityManager({ communityId }).then((res) => res.data),
  })
  const item = query.data?.item ?? undefined
  const isCommunityAdmin = item?.admin ?? false
  return {
    item,
    isCommunityAdmin,
    query,
  }
}
