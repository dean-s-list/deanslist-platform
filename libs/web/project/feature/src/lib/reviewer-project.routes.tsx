import { useRoutes } from 'react-router-dom'
import { ReviewerProjectDetailFeature } from './reviewer-project-detail-feature'
import ReviewerProjectListFeature from './reviewer-project-list.feature'

export default function ReviewerProjectRoutes() {
  return useRoutes([
    { path: '', element: <ReviewerProjectListFeature /> },
    { path: ':projectId/*', element: <ReviewerProjectDetailFeature /> },
  ])
}
