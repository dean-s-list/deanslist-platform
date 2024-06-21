import { DashboardFeature } from '@deanslist-platform/web-dashboard-feature'
import { UserProjectFeature } from '@deanslist-platform/web-project-feature'
import { UserRatingFeature } from '@deanslist-platform/web-rating-feature'
import { SettingsFeature } from '@deanslist-platform/web-settings-feature'
import { SolanaFeature } from '@deanslist-platform/web-solana-feature'
import { UserTeamFeature } from '@deanslist-platform/web-team-feature'
import { UserFeature } from '@deanslist-platform/web-user-feature'
import { UiDashboardItem } from '@pubkey-ui/core'
import { IconCube, IconSettings, IconUsers } from '@tabler/icons-react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { UserLeaderboardFeature } from '@deanslist-platform/web-leaderboard-feature'

const links: UiDashboardItem[] = [
  // User Dashboard Links are added by the web-crud generator
  { label: 'Projects', icon: IconCube, to: '/projects' },
  { label: 'Teams', icon: IconSettings, to: '/teams' },
  { label: 'Users', icon: IconUsers, to: '/u' },
]

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/dashboard', element: <DashboardFeature links={links} /> },
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/u/*', element: <UserFeature /> },
  { path: '/projects/*', element: <UserProjectFeature /> },
  { path: '/teams/*', element: <UserTeamFeature /> },
  { path: '/leaderboard/*', element: <UserLeaderboardFeature /> },

  { path: 'ratings/*', element: <UserRatingFeature /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes(routes)
}
