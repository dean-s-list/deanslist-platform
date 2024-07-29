import { ManagerUpdateReviewInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'

export function useManagerUpdateReview() {
  const sdk = useSdk()

  return async (reviewId: string, input: ManagerUpdateReviewInput) =>
    sdk
      .managerUpdateReview({ reviewId, input })
      .then((res) => res.data)
      .then(async (res) => !!res)
}
