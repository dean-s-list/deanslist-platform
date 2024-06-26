import { lazy } from 'react'

export const AdminTeamFeature = lazy(() => import('./lib/admin-team.routes'))

export const UserTeamFeature = lazy(() => import('./lib/manager-team.routes'))
