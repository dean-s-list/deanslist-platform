import { ProjectStatus, UserFindManyProjectInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyProject(props: Partial<UserFindManyProjectInput> & { teamId?: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [status, setStatus] = useState<ProjectStatus>(props?.status ?? ProjectStatus.Active)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyProjectInput = { page, limit, search, status, teamId: props.teamId }
  const query = useQuery({
    queryKey: ['user', 'find-many-project', input],
    queryFn: () => sdk.userFindManyProject({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    status,
    setStatus,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
  }
}
