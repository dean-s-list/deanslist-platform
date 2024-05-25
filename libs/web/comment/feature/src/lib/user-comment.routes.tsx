import { useRoutes } from 'react-router-dom'
import { UserCommentListFeature } from './user-comment-list.feature'

export default function UserCommentRoutes({ reviewId }: { reviewId: string }) {
  return useRoutes([{ path: '', element: <UserCommentListFeature reviewId={reviewId} /> }])
}
