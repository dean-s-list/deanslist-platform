import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserGetTeamMember({ teamId }: { teamId: string }) {
  const sdk = useSdk()

  const query = useQuery({
    queryKey: ['user', 'get-team-member', { teamId }],
    queryFn: () => sdk.userGetTeamMember({ teamId }).then((res) => res.data),
  })
  const item = query.data?.item ?? undefined
  const isTeamAdmin = item?.admin ?? false
  return {
    item,
    isTeamAdmin,
    query,
  }
}
