import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { Navigate, useRoutes } from 'react-router-dom'
import { ManagerCommunityDetailFeature } from './manager-community-detail-feature'
import { ManagerCommunityListFeature } from './manager-community-list.feature'
import { ManagerCommunityCreateFeature } from './manager-community-create.feature'

export default function ManagerCommunityRoutes() {
  const { isManager } = useAuth()

  const routes = useRoutes([
    { path: '', element: <ManagerCommunityListFeature /> },
    {
      path: 'create',
      element: <ManagerCommunityCreateFeature />,
    },
    { path: ':communityId/*', element: <ManagerCommunityDetailFeature /> },
  ])

  if (isManager) {
    return routes
  }

  return <Navigate to="/dashboard" replace />
}
