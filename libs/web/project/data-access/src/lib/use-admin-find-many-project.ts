import { AdminFindManyProjectInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyProject(props?: Partial<AdminFindManyProjectInput>) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 20)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyProjectInput = { page, limit, search, teamId: props?.teamId }
  const query = useQuery({
    queryKey: ['admin', 'find-many-project', input],
    queryFn: () => sdk.adminFindManyProject({ input }).then((res) => res.data),
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

    deleteProject: (projectId: string) =>
      sdk.adminDeleteProject({ projectId }).then(() => {
        toastSuccess('Project deleted')
        return query.refetch()
      }),
  }
}
