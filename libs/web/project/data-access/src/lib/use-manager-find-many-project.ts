import {
  ManagerCreateProjectInput,
  ManagerFindManyProjectInput,
  OrderDirection,
  Project,
  ProjectOrderBy,
  ProjectStatus,
  sdk,
} from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useManagerFindManyProject(props?: Partial<ManagerFindManyProjectInput>) {
  const [limit, setLimit] = useState(props?.limit ?? 24)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')
  const [orderBy, setOrderBy] = useState<ProjectOrderBy>(ProjectOrderBy.EndDate)
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Asc)
  const [status, setStatus] = useState<ProjectStatus>(props?.status ?? ProjectStatus.Active)
  const input: ManagerFindManyProjectInput = {
    page,
    limit,
    search,
    status,
    orderBy,
    orderDirection,
    communityId: props?.communityId ?? undefined,
  }
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
    status,
    setStatus,
    orderBy,
    order: `${orderBy}-${orderDirection}`,
    setOrder: (input: string | null) => {
      if (!input) return
      const [orderBy, orderDirection] = input.split('-') as [ProjectOrderBy, OrderDirection]
      setOrderBy(orderBy)
      setOrderDirection(orderDirection)
    },
    search,
    setSearch,
    createProject: (input: ManagerCreateProjectInput) =>
      sdk
        .managerCreateProject({ input: { ...input } })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Project created`)
          } else {
            toastError(`Project not created`)
          }
          return res.created as Project
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
