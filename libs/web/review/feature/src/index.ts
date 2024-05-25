import { lazy } from 'react'

export const AdminReviewFeature = lazy(() => import('./lib/admin-review.routes'))
export const UserReviewFeature = lazy(() => import('./lib/user-review.routes'))
