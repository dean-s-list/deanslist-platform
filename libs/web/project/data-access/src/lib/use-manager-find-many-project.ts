import { ManagerCreateProjectInput, ManagerFindManyProjectInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useManagerFindManyProject(props: Partial<ManagerFindManyProjectInput> & { teamId?: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ManagerFindManyProjectInput = { page, limit, search, teamId: props.teamId }
  const query = useQuery({
    queryKey: ['manager', 'find-many-project', input],
    queryFn: () => sdk.managerFindManyProject({ input }).then((res) => res.data),
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
    createProject: (input: ManagerCreateProjectInput) =>
      sdk
        .managerCreateProject({ input: { ...input, teamId: props.teamId ?? input.teamId } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Project created`)
          } else {
            toastError(`Project not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteProject: (projectId: string) =>
      sdk.managerDeleteProject({ projectId }).then(() => {
        toastSuccess('Project deleted')
        return query.refetch()
      }),
  }
}
