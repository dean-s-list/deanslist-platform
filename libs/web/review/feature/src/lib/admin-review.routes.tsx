import { useRoutes } from 'react-router-dom'
import { AdminReviewDetailFeature } from './admin-review-detail.feature'
import { AdminReviewListFeature } from './admin-review-list.feature'

export default function AdminReviewRoutes({ projectId }: { projectId: string }) {
  return useRoutes([
    { path: '', element: <AdminReviewListFeature projectId={projectId} /> },
    { path: ':reviewId/*', element: <AdminReviewDetailFeature /> },
  ])
}
