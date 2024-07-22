import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { ManagerCommunityFeature } from '@deanslist-platform/web-community-feature'
import { ManagerProjectFeature } from '@deanslist-platform/web-project-feature'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

export default function () {
  const { isAdmin, isManager } = useAuth()

  if (!isManager) {
    return <Navigate to="/dashboard" replace />
  }

  const routes: RouteObject[] = [
    { path: '', element: <Navigate to="projects" replace /> },
    { path: '/projects/*', element: <ManagerProjectFeature /> },
  ]

  if (isAdmin) {
    routes.push({ path: '/communities/*', element: <ManagerCommunityFeature /> })
  }

  return useRoutes(routes)
}
