import { lazy } from 'react'

export const UserRatingFeature = lazy(() => import('./lib/user-rating.routes'))

export const AdminRatingFeature = lazy(() => import('./lib/admin-rating.routes'))
