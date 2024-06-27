import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetCommunityManager({ communityId }: { communityId: string }) {
  const sdk = useSdk()

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
