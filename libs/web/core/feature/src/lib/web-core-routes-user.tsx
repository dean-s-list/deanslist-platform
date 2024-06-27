import { CoreUiNotFound } from '@deanslist-platform/web-core-ui'
import { DashboardFeature } from '@deanslist-platform/web-dashboard-feature'
import { UserLeaderboardFeature } from '@deanslist-platform/web-leaderboard-feature'
import { ReviewerProjectFeature } from '@deanslist-platform/web-project-feature'
import { UserRatingFeature } from '@deanslist-platform/web-rating-feature'
import { ReviewerUsernameReviewFeature } from '@deanslist-platform/web-review-feature'
import { SettingsFeature } from '@deanslist-platform/web-settings-feature'
import { SolanaFeature } from '@deanslist-platform/web-solana-feature'
import { UserTeamFeature } from '@deanslist-platform/web-team-feature'
import { UserFeature } from '@deanslist-platform/web-user-feature'
import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

export const ManagementRoutes = lazy(() => import('./web-core-routes-management'))

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/dashboard', element: <Navigate to="/projects" replace /> },
  { path: '/management/*', element: <ManagementRoutes /> },
  { path: '/projects/*', element: <ReviewerProjectFeature /> },
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/reviews/*', element: <ReviewerUsernameReviewFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/teams/*', element: <UserTeamFeature /> },
  { path: '/leaderboard/*', element: <UserLeaderboardFeature /> },
  { path: '/u/*', element: <UserFeature /> },
  { path: '/teams/*', element: <UserRatingFeature /> },
  { path: '*', element: <CoreUiNotFound to="/dashboard" /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes(routes)
}
