import {
  ManagerFindManyReviewByProjectInput,
  Review,
  ReviewerFindManyReviewByProjectInput,
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
          if (!res.created) {
            toastError(`Review could not be started`)
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

export function useManagerFindManyReviewByProject(
  props: Partial<ManagerFindManyReviewByProjectInput> & { projectId: string },
) {
  const sdk = useSdk()
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ManagerFindManyReviewByProjectInput = { search, projectId: props.projectId }
  const query = useQuery({
    queryKey: ['manager', 'find-many-review', input],
    queryFn: () => sdk.managerFindManyReviewByProject({ input }).then((res) => res.data),
  })
  const items: Review[] = query.data?.items ?? []

  return {
    items,
    query,
    setSearch,
  }
}
