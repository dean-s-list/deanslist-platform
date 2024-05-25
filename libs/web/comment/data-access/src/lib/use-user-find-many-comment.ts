import { UserCreateCommentInput, UserFindManyCommentInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyComment(props: Partial<UserFindManyCommentInput> & { reviewId: string }) {
  const sdk = useSdk()
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: UserFindManyCommentInput = { search, reviewId: props.reviewId }
  const query = useQuery({
    queryKey: ['user', 'find-many-comment', input],
    queryFn: () => sdk.userFindManyComment({ input }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
    setSearch,
    createComment: (input: UserCreateCommentInput) =>
      sdk
        .userCreateComment({ input: { ...input, reviewId: props.reviewId } })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.created) {
            toastSuccess(`Comment created`)
          } else {
            toastError(`Comment not created`)
          }
          await query.refetch()
          return !!res.created
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    deleteComment: (commentId: string) =>
      sdk.userDeleteComment({ commentId }).then(async () => {
        toastSuccess('Comment deleted')
        await query.refetch()
        return true
      }),
  }
}
