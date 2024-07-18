import { AdminCommunityFeature } from '@deanslist-platform/web-community-feature'
import { CoreUiDashboardGrid, CoreUiDashboardItem, CoreUiNotFound } from '@deanslist-platform/web-core-ui'
import { DevAdminRoutes } from '@deanslist-platform/web-dev-feature'
import { AdminDiscordFeature } from '@deanslist-platform/web-discord-feature'
import { AdminFaqItemFeature } from '@deanslist-platform/web-faq-item-feature'
import { AdminProjectFeature } from '@deanslist-platform/web-project-feature'
import { AdminUserFeature } from '@deanslist-platform/web-user-feature'
import { Box } from '@mantine/core'
import { UiPage } from '@pubkey-ui/core'
import { IconBrandDiscord, IconCube, IconHelp, IconShield, IconUsers, IconUsersGroup } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: CoreUiDashboardItem[] = [
  // Admin Dashboard Links are added by the web-crud generator
  { label: 'Discord', icon: IconBrandDiscord, to: '/admin/discord' },
  { label: 'Projects', icon: IconCube, to: '/admin/projects' },
  { label: 'Communities', icon: IconUsersGroup, to: '/admin/communities' },
  { label: 'FAQ Items', icon: IconHelp, to: '/admin/faq-items' },
  { label: 'Users', icon: IconUsers, to: '/admin/users' },
]

const routes: RouteObject[] = [
  // Admin Dashboard Routes are added by the web-crud generator
  { path: 'development/*', element: <DevAdminRoutes /> },
  { path: 'discord/*', element: <AdminDiscordFeature /> },
  { path: 'projects/*', element: <AdminProjectFeature /> },
  { path: 'users/*', element: <AdminUserFeature /> },
  { path: 'communities/*', element: <AdminCommunityFeature /> },
  { path: 'faq-items/*', element: <AdminFaqItemFeature /> },
]

export default function WebCoreRoutesAdmin() {
  const router = useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    {
      path: 'dashboard/*',
      element: <CoreUiDashboardGrid links={links} />,
    },
    ...routes,
    { path: '*', element: <CoreUiNotFound to="/admin" /> },
  ])

  return (
    <UiPage leftAction={<IconShield size={28} />} title="Admin">
      <Box>{router}</Box>
    </UiPage>
  )
}
