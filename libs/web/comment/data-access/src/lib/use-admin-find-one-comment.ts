import { AdminUpdateCommentInput, sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'

export function useAdminUpdateComment({ commentId }: { commentId: string }) {
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
