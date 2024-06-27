import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetCommunityMember({ communityId }: { communityId: string }) {
  const sdk = useSdk()

  const query = useQuery({
    queryKey: ['manager', 'get-community-member', { communityId }],
    queryFn: () => sdk.managerGetCommunityMember({ communityId }).then((res) => res.data),
  })
  const item = query.data?.item ?? undefined
  const isCommunityAdmin = item?.admin ?? false
  return {
    item,
    isCommunityAdmin,
    query,
  }
}
