import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { UiRouteParams } from '@deanslist-platform/web-core-ui'
import { Navigate, useRoutes } from 'react-router-dom'
import { ReviewerUsernameReviewListFeature } from './reviewer-username-review-list.feature'

export default function ReviewerUsernameReviewRoutes() {
  const { user } = useAuth()

  const username = user?.username as string

  return useRoutes([
    { index: true, element: <Navigate to={`./${username}`} replace /> },
    {
      path: ':username',
      element: <UiRouteParams element={({ username }) => <ReviewerUsernameReviewListFeature username={username} />} />,
    },
  ])
}
