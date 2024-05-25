import { lazy } from 'react'

export const AdminProjectFeature = lazy(() => import('./lib/admin-project.routes'))
export const UserProjectTeamFeature = lazy(() => import('./lib/user-project-team.routes'))
export const UserProjectFeature = lazy(() => import('./lib/user-project.routes'))
