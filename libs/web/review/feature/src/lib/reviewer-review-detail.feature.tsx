import { ReviewerCommentFeature } from '@deanslist-platform/web-comment-feature'
import { CoreUiBackLink, CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { useReviewerFindOneReview } from '@deanslist-platform/web-review-data-access'
import { Group } from '@mantine/core'
import { UiError, UiLoader } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'

export function ReviewerReviewDetailFeature({ onReviewUpdates }: { onReviewUpdates?: () => void }) {
  const { reviewId } = useParams<{ reviewId: string }>() as { reviewId: string }
  const { item, query } = useReviewerFindOneReview({ reviewId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Review not found." />
  }
  if (!item.reviewer) {
    return <UiError message="Reviewer not found." />
  }

  return (
    <ReviewerCommentFeature
      review={item}
      onReviewUpdates={onReviewUpdates}
      leftAction={
        <Group>
          <CoreUiBackLink label="Back to all reviews" />
          <CoreUiDebugModal data={item} />
        </Group>
      }
    />
  )
}
