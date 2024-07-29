import { ManagerUpdateReviewInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'

export function useManagerFindOneReview({ reviewId }: { reviewId: string }) {
  const sdk = useSdk()

  return {
    updateReview: async (input: ManagerUpdateReviewInput) =>
      sdk
        .managerUpdateReview({ reviewId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            return true
          }
          return false
        }),
  }
}
