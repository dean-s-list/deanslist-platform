import { useRoutes } from 'react-router-dom'
import { UserReviewDetailFeature } from './user-review-detail.feature'
import { UserReviewListFeature } from './user-review-list.feature'

export default function UserReviewRoutes({ projectId }: { projectId: string }) {
  return useRoutes([
    { path: '', element: <UserReviewListFeature projectId={projectId} /> },
    { path: ':reviewId/*', element: <UserReviewDetailFeature /> },
  ])
}
