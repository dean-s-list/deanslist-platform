import { lazy } from 'react'

export const AdminProjectFeature = lazy(() => import('./lib/admin-project.routes'))
export const ManagerProjectFeature = lazy(() => import('./lib/manager-project.routes'))
export const ReviewerProjectFeature = lazy(() => import('./lib/reviewer-project.routes'))
