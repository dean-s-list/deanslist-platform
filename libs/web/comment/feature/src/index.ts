import { lazy } from 'react'

export const AdminCommentFeature = lazy(() => import('./lib/admin-comment.routes'))
export const UserCommentFeature = lazy(() => import('./lib/user-comment.routes'))
