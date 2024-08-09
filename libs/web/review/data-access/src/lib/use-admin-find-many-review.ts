import { AdminFindManyReviewInput, sdk } from '@deanslist-platform/sdk'
import { toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyReview(props: Partial<AdminFindManyReviewInput> & { projectId: string }) {
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyReviewInput = { page, limit, search, projectId: props.projectId }
  const query = useQuery({
    queryKey: ['admin', 'find-many-review', input],
    queryFn: () => sdk.adminFindManyReview({ input }).then((res) => res.data),
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
    deleteReview: (reviewId: string) =>
      sdk.adminDeleteReview({ reviewId }).then(() => {
        toastSuccess('Review deleted')
        return query.refetch()
      }),
  }
}
