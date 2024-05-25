import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetTeamMembers({ teamId }: { teamId: string }) {
  const sdk = useSdk()

  const query = useQuery({
    queryKey: ['admin', 'get-team-members', { teamId }],
    queryFn: () => sdk.adminGetTeamMembers({ teamId }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
