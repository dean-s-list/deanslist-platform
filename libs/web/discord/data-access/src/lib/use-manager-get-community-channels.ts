import { sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetCommunityChannels({ communityId }: { communityId: string }) {
  const query = useQuery({
    queryKey: ['userGetCommunityChannels', { communityId }],
    queryFn: () => sdk.userGetCommunityChannels({ communityId }).then((res) => res.data),
  })

  const items = query.data?.items || []

  return {
    query,
    items,
  }
}
