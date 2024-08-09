import { sdk, UserFindManyCommunityInput } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyCommunity(props?: Partial<UserFindManyCommunityInput>) {
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyCommunityInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['user', 'find-many-community', input],
    queryFn: () => sdk.userFindManyCommunity({ input }).then((res) => res.data),
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
  }
}
