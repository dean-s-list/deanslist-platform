import { lazy } from 'react'

export const AdminProjectFeature = lazy(() => import('./lib/admin-project.routes'))
export const ManagerProjectTeamFeature = lazy(() => import('./lib/manager-project.routes'))
export const UserProjectFeature = lazy(() => import('./lib/user-project.routes'))
