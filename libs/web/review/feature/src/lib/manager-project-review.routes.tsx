import { useRoutes } from 'react-router-dom'
import { ManagerProjectReviewListFeature } from './manager-project-review-list.feature'

export default function ManagerProjectReviewRoutes({ projectId }: { projectId: string }) {
  return useRoutes([{ path: '', element: <ManagerProjectReviewListFeature projectId={projectId} /> }])
}
