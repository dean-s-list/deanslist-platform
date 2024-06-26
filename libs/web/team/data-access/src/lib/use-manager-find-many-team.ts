import { ManagerCreateTeamInput, ManagerFindManyTeamInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useManagerFindManyTeam(props?: Partial<ManagerFindManyTeamInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ManagerFindManyTeamInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['manager', 'find-many-team', input],
    queryFn: () => sdk.managerFindManyTeam({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

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
    createTeam: (input: ManagerCreateTeamInput) =>
      sdk
        .managerCreateTeam({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Team created`)
          } else {
            toastError(`Team not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteTeam: (teamId: string) =>
      sdk.managerDeleteTeam({ teamId }).then(() => {
        toastSuccess('Team deleted')
        return query.refetch()
      }),
  }
}
