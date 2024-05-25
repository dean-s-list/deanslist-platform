import { UserCreateRatingInput, UserFindManyRatingInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyRating(props?: Partial<UserFindManyRatingInput>) {
  const sdk = useSdk()
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyRatingInput = { search }
  const query = useQuery({
    queryKey: ['user', 'find-many-rating', input],
    queryFn: () => sdk.userFindManyRating({ input }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
    setSearch,
    createRating: (input: UserCreateRatingInput) =>
      sdk
        .userCreateRating({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Rating created`)
          } else {
            toastError(`Rating not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteRating: (ratingId: string) =>
      sdk.userDeleteRating({ ratingId }).then(() => {
        toastSuccess('Rating deleted')
        return query.refetch()
      }),
  }
}
