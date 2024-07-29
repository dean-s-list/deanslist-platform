import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ManagerProjectUiPayoutsForm } from '@deanslist-platform/web-project-ui'
import { useManagerFindManyReviewByProject, useManagerUpdateReview } from '@deanslist-platform/web-review-data-access'
import { UiError, UiLoader } from '@pubkey-ui/core'

export function ManagerProjectDetailPayoutsTab({ projectId }: { projectId: string }) {
  const { item, query, invalidate, splitByRating } = useManagerFindOneProject({ projectId })
  const { items: reviews, query: reviewsQuery } = useManagerFindManyReviewByProject({ projectId })
  const updateReview = useManagerUpdateReview()

  if (query.isLoading || reviewsQuery.isLoading || reviewsQuery.isFetching) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <ManagerProjectUiPayoutsForm
      project={item}
      splitByRating={async () => {
        return splitByRating().then(async (res) => {
          await reviewsQuery.refetch()
          return res
        })
      }}
      updateReview={(reviewId, input) =>
        updateReview(reviewId, input).then(async (res) => {
          await invalidate()
          return res
        })
      }
      reviews={reviews}
    />
  )
}
