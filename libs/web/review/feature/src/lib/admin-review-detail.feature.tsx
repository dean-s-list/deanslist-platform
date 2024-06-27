import { AdminCommentFeature } from '@deanslist-platform/web-comment-feature'
import { CoreUiBack, CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { useAdminFindOneReview } from '@deanslist-platform/web-review-data-access'
import { ReviewUiItem } from '@deanslist-platform/web-review-ui'
import { Group } from '@mantine/core'
import { UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'

export function AdminReviewDetailFeature() {
  const { reviewId } = useParams<{ reviewId: string }>() as { reviewId: string }
  const { item, query } = useAdminFindOneReview({ reviewId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Review not found." />
  }

  return (
    <UiStack>
      <UiGroup>
        <Group>
          <CoreUiBack />
          <ReviewUiItem review={item} />
        </Group>

        <Group>
          <CoreUiDebugModal data={item} />
        </Group>
      </UiGroup>
      <AdminCommentFeature reviewId={reviewId} />
    </UiStack>
  )
}
