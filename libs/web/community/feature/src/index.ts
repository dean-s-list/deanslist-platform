import { lazy } from 'react'

export const AdminCommunityFeature = lazy(() => import('./lib/admin-community.routes'))
export const ManagerCommunityFeature = lazy(() => import('./lib/manager-community.routes'))
export const UserCommunityFeature = lazy(() => import('./lib/user-community.routes'))
