import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetTeamChannels({ teamId }: { teamId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['userGetTeamChannels', { teamId }],
    queryFn: () => sdk.userGetTeamChannels({ teamId }).then((res) => res.data),
  })

  const items = query.data?.items || []

  return {
    query,
    items,
  }
}
