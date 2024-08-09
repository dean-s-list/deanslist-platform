import { ManagerCreateCommunityInput, ManagerFindManyCommunityInput, sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useManagerFindManyCommunity(props?: Partial<ManagerFindManyCommunityInput>) {
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ManagerFindManyCommunityInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['manager', 'find-many-community', input],
    queryFn: () => sdk.managerFindManyCommunity({ input }).then((res) => res.data),
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
    createCommunity: (input: ManagerCreateCommunityInput) =>
      sdk
        .managerCreateCommunity({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Community created`)
          } else {
            toastError(`Community not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteCommunity: (communityId: string) =>
      sdk.managerDeleteCommunity({ communityId }).then(() => {
        toastSuccess('Community deleted')
        return query.refetch()
      }),
  }
}
