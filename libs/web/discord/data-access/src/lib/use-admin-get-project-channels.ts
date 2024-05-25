import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetProjectChannels({ projectId }: { projectId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['adminGetProjectChannels', { projectId }],
    queryFn: () => sdk.adminGetProjectChannels({ projectId }).then((res) => res.data),
  })

  const items = query.data?.items || []

  return {
    query,
    items,
  }
}
