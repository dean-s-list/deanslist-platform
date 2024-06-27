import { useRoutes } from 'react-router-dom'
import { ManagerProjectCreateFeature } from './manager-project-create-feature'
import { ManagerProjectDetailFeature } from './manager-project-detail.feature'
import { ManagerProjectListFeature } from './manager-project-list-feature'

export default function ManagerProjectRoutes({ communityId }: { communityId?: string }) {
  return useRoutes([
    { path: '', element: <ManagerProjectListFeature communityId={communityId} /> },
    {
      path: 'create',
      element: communityId ? <ManagerProjectCreateFeature communityId={communityId} /> : null,
    },
    { path: ':projectId/*', element: <ManagerProjectDetailFeature /> },
  ])
}
