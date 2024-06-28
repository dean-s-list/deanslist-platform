import { lazy } from 'react'

export const AdminReviewFeature = lazy(() => import('./lib/admin-review.routes'))
export const ManagerProjectReviewFeature = lazy(() => import('./lib/manager-project-review.routes'))
export const ReviewerProjectReviewFeature = lazy(() => import('./lib/reviewer-project-review.routes'))
export const ReviewerUsernameReviewFeature = lazy(() => import('./lib/reviewer-username-review.routes'))
