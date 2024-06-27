import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { ManagerCommunityFeature } from '@deanslist-platform/web-community-feature'
import { Navigate, useRoutes } from 'react-router-dom'

export default function () {
  const { isManager } = useAuth()

  if (!isManager) {
    return <Navigate to="/dashboard" replace />
  }

  return useRoutes([
    { path: '', element: <Navigate to="communities" replace /> },
    { path: '/communities/*', element: <ManagerCommunityFeature /> },
  ])
}
