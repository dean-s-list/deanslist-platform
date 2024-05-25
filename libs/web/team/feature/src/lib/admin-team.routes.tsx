import { useRoutes } from 'react-router-dom'
import { AdminTeamDetailFeature } from './admin-team-detail.feature'
import { AdminTeamListFeature } from './admin-team-list.feature'

export default function AdminTeamRoutes() {
  return useRoutes([
    { path: '', element: <AdminTeamListFeature /> },
    { path: ':teamId/*', element: <AdminTeamDetailFeature /> },
  ])
}
