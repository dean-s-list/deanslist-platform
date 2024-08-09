import { AdminUpdateRatingInput, sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'

export function useAdminFindOneRating({ ratingId }: { ratingId: string }) {
  return {
    updateRating: async (input: AdminUpdateRatingInput) =>
      sdk
        .adminUpdateRating({ ratingId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Rating updated')
            return true
          }
          toastError('Rating not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
