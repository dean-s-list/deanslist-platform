import { AdminUpdateRatingInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'

export function useAdminFindOneRating({ ratingId }: { ratingId: string }) {
  const sdk = useSdk()

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
