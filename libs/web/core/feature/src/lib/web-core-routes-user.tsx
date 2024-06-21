import { DashboardFeature } from '@deanslist-platform/web-dashboard-feature'
import { UserLeaderboardFeature } from '@deanslist-platform/web-leaderboard-feature'
import { UserManagementFeature } from '@deanslist-platform/web-management-feature'
import { UserProjectFeature } from '@deanslist-platform/web-project-feature'
import { UserRatingFeature } from '@deanslist-platform/web-rating-feature'
import { SettingsFeature } from '@deanslist-platform/web-settings-feature'
import { SolanaFeature } from '@deanslist-platform/web-solana-feature'
import { UserTeamFeature } from '@deanslist-platform/web-team-feature'
import { UserFeature } from '@deanslist-platform/web-user-feature'
import { UiDashboardItem } from '@pubkey-ui/core'
import { IconCube, IconSettings, IconUsers } from '@tabler/icons-react'
import { RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // User Dashboard Links are added by the web-crud generator
  { label: 'Projects', icon: IconCube, to: '/projects' },
  { label: 'Teams', icon: IconSettings, to: '/teams' },
  { label: 'Users', icon: IconUsers, to: '/u' },
]

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/dashboard', element: <DashboardFeature links={links} /> },
  { path: '/management/*', element: <UserManagementFeature /> },
  { path: '/projects/*', element: <UserProjectFeature /> },
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/teams/*', element: <UserTeamFeature /> },
  { path: '/leaderboard/*', element: <UserLeaderboardFeature /> },
  { path: '/u/*', element: <UserFeature /> },
  { path: 'ratings/*', element: <UserRatingFeature /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes(routes)
}
