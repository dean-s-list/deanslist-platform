import { ManagerCreateRatingInput, ManagerUpdateRatingInput, sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'

export function useManagerRating() {
  return {
    createRating: (input: ManagerCreateRatingInput) =>
      sdk
        .managerCreateRating({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Rating created`)
          } else {
            toastError(`Rating not created`)
          }
          return !!res.created
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    updateRating: async (ratingId: string, input: ManagerUpdateRatingInput) =>
      sdk
        .managerUpdateRating({ ratingId, input })
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
    deleteRating: (ratingId: string) =>
      sdk
        .managerDeleteRating({ ratingId })
        .then(() => {
          toastSuccess('Rating deleted')
          return true
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
