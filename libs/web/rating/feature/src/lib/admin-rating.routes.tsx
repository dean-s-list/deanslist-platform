import { useRoutes } from 'react-router-dom'
import { AdminRatingListFeature } from './admin-rating-list.feature'

export default function AdminRatingRoutes() {
  return useRoutes([{ path: '', element: <AdminRatingListFeature /> }])
}
