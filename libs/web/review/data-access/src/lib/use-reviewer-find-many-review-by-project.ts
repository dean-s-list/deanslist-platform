import {
  Review,
  ReviewerFindManyReviewByProjectInput,
  ReviewerFindManyReviewByUsernameInput,
} from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useReviewerFindManyReviewByProject(
  props: Partial<ReviewerFindManyReviewByProjectInput> & { projectId: string },
) {
  const sdk = useSdk()
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ReviewerFindManyReviewByProjectInput = { search, projectId: props.projectId }
  const query = useQuery({
    queryKey: ['reviewer', 'find-many-review', input],
    queryFn: () => sdk.reviewerFindManyReviewByProject({ input }).then((res) => res.data),
  })
  const items: Review[] = query.data?.items ?? []

  return {
    items,
    query,
    setSearch,
    createReview: () =>
      sdk
        .reviewerCreateReview({ projectId: props.projectId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.created) {
            toastSuccess(`Review created`)
          } else {
            toastError(`Review not created`)
          }
          await query.refetch()
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteReview: (reviewId: string) =>
      sdk.reviewerDeleteReview({ reviewId }).then(() => {
        toastSuccess('Review deleted')
        return query.refetch()
      }),
  }
}
export function useReviewerFindManyReviewByUsername(
  props: Partial<ReviewerFindManyReviewByUsernameInput> & { username: string },
) {
  const sdk = useSdk()
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ReviewerFindManyReviewByUsernameInput = { search, username: props.username }
  const query = useQuery({
    queryKey: ['reviewer', 'find-many-review-by-username', input],
    queryFn: () => sdk.reviewerFindManyReviewByUsername({ input }).then((res) => res.data),
  })
  const items: Review[] = query.data?.items ?? []

  return {
    items,
    query,
    setSearch,
  }
}
