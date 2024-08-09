import { sdk, UserFindManyUserInput } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyUser(props?: UserFindManyUserInput) {
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>('')

  const input: UserFindManyUserInput = { limit, page, search, filterIds: props?.filterIds ?? [] }
  const query = useQuery({
    queryKey: ['user', 'find-many-user', input],
    queryFn: () => sdk.userFindManyUser({ input }).then((res) => res.data),
    retry: 0,
  })
  const total = query.data?.paging.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      limit,
      page,
      total,
      setLimit,
      setPage,
    },
    setSearch,
  }
}
