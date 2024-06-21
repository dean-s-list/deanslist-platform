import { CoreUiDashboardGrid, CoreUiDashboardItem, CoreUiNotFound } from '@deanslist-platform/web-core-ui'
import { DevAdminRoutes } from '@deanslist-platform/web-dev-feature'
import { AdminDiscordFeature } from '@deanslist-platform/web-discord-feature'
import { AdminProjectFeature } from '@deanslist-platform/web-project-feature'
import { AdminRatingFeature } from '@deanslist-platform/web-rating-feature'
import { AdminTeamFeature } from '@deanslist-platform/web-team-feature'
import { AdminUserFeature } from '@deanslist-platform/web-user-feature'
import { UiContainer } from '@pubkey-ui/core'
import { IconBrandDiscord, IconCube, IconUsers, IconUsersGroup } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: CoreUiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-crud generator
  { label: 'Discord', icon: IconBrandDiscord, to: '/admin/discord' },
  { label: 'Projects', icon: IconCube, to: '/admin/projects' },
  { label: 'Teams', icon: IconUsersGroup, to: '/admin/teams' },
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-crud generator
  { path: 'development/*', element: <DevAdminRoutes /> },
  { path: 'discord/*', element: <AdminDiscordFeature /> },
  { path: 'projects/*', element: <AdminProjectFeature /> },
  { path: 'users/*', element: <AdminUserFeature /> },
  { path: 'teams/*', element: <AdminTeamFeature /> },

  { path: 'ratings/*', element: <AdminRatingFeature /> },
]

export default function WebCoreRoutesAdmin() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    {
      path: 'dashboard/*',
      element: (
        <UiContainer>
          <CoreUiDashboardGrid links={links} />
        </UiContainer>
      ),
    },
    ...routes,
    { path: '*', element: <CoreUiNotFound to="/admin" /> },
  ])
}
