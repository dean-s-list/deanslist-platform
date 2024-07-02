import { AuthLoginFeature, AuthRegisterFeature } from '@deanslist-platform/web-auth-feature'
import { CoreUiNotFound } from '@deanslist-platform/web-core-ui'
import { HomeFeature } from '@deanslist-platform/web-home-feature'
import { OnboardingFeature } from '@deanslist-platform/web-onboarding-feature'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { useGuardedRoutes } from './use-guarded-routes'
import { UserLeaderboardFeature } from '@deanslist-platform/web-leaderboard-feature'

export const LazyAdminFeature = lazy(() => import('./web-core-routes-admin'))
export const LazyUserFeature = lazy(() => import('./web-core-routes-user'))

export function WebCoreRoutes() {
  return useGuardedRoutes({
    index: '/dashboard',
    admin: [
      // Here you can add routes that are only accessible by admins under the /admin/* path
      // Visit /admin/custom-admin-page to see this route
      // { path: 'custom-admin-page', element: <div>CUSTOM ADMIN PAGE HERE</div> },
      { path: '*', element: <LazyAdminFeature /> },
    ],
    layout: [
      // Here you can add routes that are part of the main layout
      { path: '*', element: <LazyUserFeature /> },
    ],
    full: [
      // Here you can add routes that are not part of the main layout, visit /custom-full-page to see this route
      // { path: 'custom-full-page', element: <div>CUSTOM FULL PAGE</div> },
      { path: '/onboarding/*', element: <OnboardingFeature /> },
    ],
    public: [
      // Routes for the auth feature
      { path: '/login', element: <AuthLoginFeature /> },
      { path: '/register', element: <AuthRegisterFeature /> },
      // Homepage
      { path: '/*', element: <HomeFeature /> },
      { path: '/leaderboard/*', element: <UserLeaderboardFeature /> },
      // Routes for the 404 page
      { path: '/404', element: <CoreUiNotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  })
}
