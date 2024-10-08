import { AdminFindManyRatingInput, sdk } from '@deanslist-platform/sdk'
import { toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyRating(props?: Partial<AdminFindManyRatingInput>) {
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyRatingInput = { search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-rating', input],
    queryFn: () => sdk.adminFindManyRating({ input }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
    setSearch,
    deleteRating: (ratingId: string) =>
      sdk.adminDeleteRating({ ratingId }).then(() => {
        toastSuccess('Rating deleted')
        return query.refetch()
      }),
  }
}
