import { AdminUpdateCommentInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'

export function useAdminUpdateComment({ commentId }: { commentId: string }) {
  const sdk = useSdk()
  return {
    updateComment: async (input: AdminUpdateCommentInput) =>
      sdk
        .adminUpdateComment({ commentId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Comment updated')
            return true
          }
          toastError('Comment not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
