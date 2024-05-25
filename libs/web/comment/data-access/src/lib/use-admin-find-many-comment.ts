import { AdminFindManyCommentInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyComment(props: Partial<AdminFindManyCommentInput> & { reviewId: string }) {
  const sdk = useSdk()
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: AdminFindManyCommentInput = { search, reviewId: props.reviewId }
  const query = useQuery({
    queryKey: ['admin', 'find-many-comment', input],
    queryFn: () => sdk.adminFindManyComment({ input }).then((res) => res.data),
  })
  const items = query.data?.items

  return {
    items,
    query,
    setSearch,
    deleteComment: (commentId: string) =>
      sdk.adminDeleteComment({ commentId }).then(() => {
        toastSuccess('Comment deleted')
        return query.refetch()
      }),
  }
}
