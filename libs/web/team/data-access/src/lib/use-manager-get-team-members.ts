import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetTeamMembers({ teamId }: { teamId: string }) {
  const sdk = useSdk()

  const query = useQuery({
    queryKey: ['manager', 'get-team-members', { teamId }],
    queryFn: () => sdk.managerGetTeamMembers({ teamId }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
