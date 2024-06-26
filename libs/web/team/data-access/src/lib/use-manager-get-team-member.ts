import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetTeamMember({ teamId }: { teamId: string }) {
  const sdk = useSdk()

  const query = useQuery({
    queryKey: ['manager', 'get-team-member', { teamId }],
    queryFn: () => sdk.managerGetTeamMember({ teamId }).then((res) => res.data),
  })
  const item = query.data?.item ?? undefined
  const isTeamAdmin = item?.admin ?? false
  return {
    item,
    isTeamAdmin,
    query,
  }
}
