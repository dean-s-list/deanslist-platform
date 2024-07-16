import { useRoutes } from 'react-router-dom'
import { ReviewerProjectReviewListFeature } from './reviewer-project-review-list.feature'
import { ReviewerReviewDetailFeature } from './reviewer-review-detail.feature'

export default function ReviewerProjectReviewRoutes({ projectId }: { projectId: string }) {
  return useRoutes([
    { path: '', element: <ReviewerProjectReviewListFeature projectId={projectId} /> },
    { path: ':reviewId/*', element: <ReviewerReviewDetailFeature /> },
  ])
}
