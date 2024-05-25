import { useRoutes } from 'react-router-dom'
import { UserRatingListFeature } from './user-rating-list.feature'

export default function UserRatingRoutes() {
  return useRoutes([{ path: '', element: <UserRatingListFeature /> }])
}
