import { AdminCommentListFeature } from './admin-comment-list.feature'

export default function AdminCommentRoutes({ reviewId }: { reviewId: string }) {
  return <AdminCommentListFeature reviewId={reviewId} />
}
