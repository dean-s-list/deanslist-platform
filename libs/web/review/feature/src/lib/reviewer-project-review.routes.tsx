import { useRoutes } from 'react-router-dom'
import { ReviewerProjectReviewListFeature } from './reviewer-project-review-list.feature'
import { ReviewerReviewDetailFeature } from './reviewer-review-detail.feature'

export default function ReviewerProjectReviewRoutes({
  projectId,
  onReviewUpdates,
}: {
  projectId: string
  onReviewUpdates?: () => void
}) {
  return useRoutes([
    { path: '', element: <ReviewerProjectReviewListFeature projectId={projectId} /> },
    { path: ':reviewId/*', element: <ReviewerReviewDetailFeature onReviewUpdates={onReviewUpdates} /> },
  ])
}
