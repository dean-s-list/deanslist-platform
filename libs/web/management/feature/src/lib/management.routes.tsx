import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { Navigate, useRoutes } from 'react-router-dom'
import { ManagementProjectsFeature } from './management-projects-feature'
import { ManagementTeamsFeature } from './management-teams-feature'

export default function () {
  const { isManager } = useAuth()

  if (!isManager) {
    return <Navigate to="/dashboard" replace />
  }

  return useRoutes([
    { path: '', element: <Navigate to="projects" replace /> },
    { path: 'projects', element: <ManagementProjectsFeature /> },
    { path: 'teams', element: <ManagementTeamsFeature /> },
  ])
}
