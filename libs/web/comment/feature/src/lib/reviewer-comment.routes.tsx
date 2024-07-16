import { Review } from '@deanslist-platform/sdk'
import { ReactNode } from 'react'
import { useRoutes } from 'react-router-dom'
import { ReviewerCommentListFeature } from './reviewer-comment-list.feature'

export default function ReviewerCommentRoutes({ review, leftAction }: { review: Review; leftAction: ReactNode }) {
  return useRoutes([{ path: '', element: <ReviewerCommentListFeature review={review} leftAction={leftAction} /> }])
}
