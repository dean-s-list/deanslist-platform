import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetCommunityChannels({ communityId }: { communityId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['adminGetCommunityChannels', { communityId }],
    queryFn: () => sdk.adminGetCommunityChannels({ communityId }).then((res) => res.data),
  })

  const items = query.data?.items || []

  return {
    query,
    items,
  }
}
