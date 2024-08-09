import { sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetProjectChannels({ projectId }: { projectId: string }) {
  const query = useQuery({
    queryKey: ['userGetProjectChannels', { projectId }],
    queryFn: () => sdk.userGetProjectChannels({ projectId }).then((res) => res.data),
  })

  const items = query.data?.items || []

  return {
    query,
    items,
  }
}
