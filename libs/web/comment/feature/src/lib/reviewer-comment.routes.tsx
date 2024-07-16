import { Review } from '@deanslist-platform/sdk'
import { ReactNode } from 'react'
import { useRoutes } from 'react-router-dom'
import { ReviewerCommentListFeature } from './reviewer-comment-list.feature'

export default function ReviewerCommentRoutes({
  review,
  leftAction,
  onReviewUpdates,
}: {
  review: Review
  leftAction: ReactNode
  onReviewUpdates?: () => void
}) {
  return useRoutes([
    {
      path: '',
      element: <ReviewerCommentListFeature review={review} leftAction={leftAction} onReviewUpdates={onReviewUpdates} />,
    },
  ])
}
