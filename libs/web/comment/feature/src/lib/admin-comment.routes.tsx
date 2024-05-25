import { useRoutes } from 'react-router-dom'
import { AdminCommentListFeature } from './admin-comment-list.feature'

export default function AdminCommentRoutes({ reviewId }: { reviewId: string }) {
  return useRoutes([{ path: '', element: <AdminCommentListFeature reviewId={reviewId} /> }])
}
