import { useRoutes } from 'react-router-dom'
import { ReviewerCommentListFeature } from './reviewer-comment-list.feature'

export default function ReviewerCommentRoutes({ reviewId }: { reviewId: string }) {
  return useRoutes([{ path: '', element: <ReviewerCommentListFeature reviewId={reviewId} /> }])
}
