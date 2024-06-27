import { UserCommentFeature } from '@deanslist-platform/web-comment-feature'
import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { useUserFindOneReview } from '@deanslist-platform/web-review-data-access'
import { ReviewUiItem } from '@deanslist-platform/web-review-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'

export function UserReviewDetailFeature() {
  const { reviewId } = useParams<{ reviewId: string }>() as { reviewId: string }
  const { item, query } = useUserFindOneReview({ reviewId })

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
    <UiStack>
      <UiGroup>
        <Group>
          <CoreUiBack />
          <ReviewUiItem review={item} />
        </Group>
        <Group>
          <UiDebugModal data={item} />
        </Group>
      </UiGroup>

      <UserCommentFeature reviewId={reviewId} />
    </UiStack>
  )
}
