import { useRoutes } from 'react-router-dom'
import { ManagerProjectDetailFeature } from './manager-project-detail.feature'
import { ManagerProjectListFeature } from './manager-project-list-feature'

export default function ManagerProjectRoutes({ communityId }: { communityId?: string }) {
  return useRoutes([
    { path: '', element: <ManagerProjectListFeature communityId={communityId} /> },
    { path: ':projectId/*', element: <ManagerProjectDetailFeature /> },
  ])
}
