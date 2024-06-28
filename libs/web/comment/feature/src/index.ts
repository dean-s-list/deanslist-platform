import { lazy } from 'react'

export const AdminCommentFeature = lazy(() => import('./lib/admin-comment.routes'))
export const ManagerCommentFeature = lazy(() => import('./lib/manager-comment.routes'))
export const ReviewerCommentFeature = lazy(() => import('./lib/reviewer-comment.routes'))
