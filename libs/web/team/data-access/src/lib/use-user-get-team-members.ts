import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserGetTeamMembers({ teamId }: { teamId: string }) {
  const sdk = useSdk()

  const query = useQuery({
    queryKey: ['user', 'get-team-members', { teamId }],
    queryFn: () => sdk.userGetTeamMembers({ teamId }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
  }
}
