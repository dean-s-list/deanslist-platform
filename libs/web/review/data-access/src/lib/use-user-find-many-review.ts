import { Review, UserFindManyReviewInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyReview(props: Partial<UserFindManyReviewInput> & { projectId: string }) {
  const sdk = useSdk()
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyReviewInput = { search, projectId: props.projectId }
  const query = useQuery({
    queryKey: ['user', 'find-many-review', input],
    queryFn: () => sdk.userFindManyReview({ input }).then((res) => res.data),
  })
  const items: Review[] = query.data?.items ?? []

  return {
    items,
    query,
    setSearch,
    createReview: () =>
      sdk
        .userCreateReview({ projectId: props.projectId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.created) {
            toastSuccess(`Review created`)
          } else {
            toastError(`Review not created`)
          }
          await query.refetch()
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteReview: (reviewId: string) =>
      sdk.userDeleteReview({ reviewId }).then(() => {
        toastSuccess('Review deleted')
        return query.refetch()
      }),
  }
}
