import { AdminFindManyTeamInput, Team } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyTeam(props?: Partial<AdminFindManyTeamInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyTeamInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-team', input],
    queryFn: () => sdk.adminFindManyTeam({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items: Team[] = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
    deleteTeam: (teamId: string) =>
      sdk.adminDeleteTeam({ teamId }).then(() => {
        toastSuccess('Team deleted')
        return query.refetch()
      }),
  }
}
