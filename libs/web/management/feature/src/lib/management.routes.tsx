import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { ManagerTeamFeature } from '@deanslist-platform/web-team-feature'
import { Navigate, useRoutes } from 'react-router-dom'
import { ManagementProjectsFeature } from './management-projects-feature'

export default function () {
  const { isManager } = useAuth()

  if (!isManager) {
    return <Navigate to="/dashboard" replace />
  }

  return useRoutes([
    { path: '', element: <Navigate to="projects" replace /> },
    { path: '/projects/*', element: <ManagementProjectsFeature /> },
    { path: '/teams/*', element: <ManagerTeamFeature /> },
  ])
}
