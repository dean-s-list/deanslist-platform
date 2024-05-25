import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetTeamChannels({ teamId }: { teamId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['adminGetTeamChannels', { teamId }],
    queryFn: () => sdk.adminGetTeamChannels({ teamId }).then((res) => res.data),
  })

  const items = query.data?.items || []

  return {
    query,
    items,
  }
}
