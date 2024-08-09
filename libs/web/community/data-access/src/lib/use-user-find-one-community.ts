import { sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneCommunity({ communityId }: { communityId: string }) {
  const query = useQuery({
    queryKey: ['user', 'find-one-community', communityId],
    queryFn: () => sdk.userFindOneCommunity({ communityId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
  }
}
