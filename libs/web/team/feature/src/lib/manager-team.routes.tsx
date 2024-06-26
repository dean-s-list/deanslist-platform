import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { Navigate, useRoutes } from 'react-router-dom'
import { ManagerTeamDetailFeature } from './manager-team-detail-feature'
import { ManagerTeamListFeature } from './manager-team-list.feature'
import { ManagerTeamCreateFeature } from './manager-team-create.feature'

export default function ManagerTeamRoutes() {
  const { isManager } = useAuth()

  const routes = useRoutes([
    { path: '', element: <ManagerTeamListFeature /> },
    {
      path: 'create',
      element: <ManagerTeamCreateFeature />,
    },
    { path: ':teamId/*', element: <ManagerTeamDetailFeature /> },
  ])

  if (isManager) {
    return routes
  }

  return <Navigate to="/dashboard" replace />
}
