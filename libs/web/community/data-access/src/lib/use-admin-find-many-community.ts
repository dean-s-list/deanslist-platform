import { AdminFindManyCommunityInput, Community, sdk } from '@deanslist-platform/sdk'
import { toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyCommunity(props?: Partial<AdminFindManyCommunityInput>) {
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyCommunityInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-community', input],
    queryFn: () => sdk.adminFindManyCommunity({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items: Community[] = query.data?.paging.data ?? []

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
    deleteCommunity: (communityId: string) =>
      sdk.adminDeleteCommunity({ communityId }).then(() => {
        toastSuccess('Community deleted')
        return query.refetch()
      }),
  }
}
