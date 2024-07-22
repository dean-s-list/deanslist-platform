import { UserCommunityFeature } from '@deanslist-platform/web-community-feature'
import { CoreUiNotFound } from '@deanslist-platform/web-core-ui'
import { FaqFeature } from '@deanslist-platform/web-faq-feature'
import { ReviewerProjectFeature } from '@deanslist-platform/web-project-feature'
import { ReviewerUsernameReviewFeature } from '@deanslist-platform/web-review-feature'
import { SettingsFeature } from '@deanslist-platform/web-settings-feature'
import { SolanaFeature } from '@deanslist-platform/web-solana-feature'
import { UserFeature } from '@deanslist-platform/web-user-feature'
import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

export const ManagerRoutes = lazy(() => import('./web-core-routes-manager'))

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/dashboard', element: <Navigate to="/projects" replace /> },
  { path: '/faq/*', element: <FaqFeature /> },
  { path: '/manager/*', element: <ManagerRoutes /> },
  { path: '/projects/*', element: <ReviewerProjectFeature /> },
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/reviews/*', element: <ReviewerUsernameReviewFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/communities/*', element: <UserCommunityFeature /> },
  { path: '/u/*', element: <UserFeature /> },
  { path: '*', element: <CoreUiNotFound to="/dashboard" /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes(routes)
}
