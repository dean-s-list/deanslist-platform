import { useRoutes } from 'react-router-dom'
import { ManagerProjectCreateFeature } from './manager-project-create-feature'
import { ManagerProjectDetailFeature } from './manager-project-detail.feature'
import { ManagerProjectListFeature } from './manager-project-list-feature'

export default function ManagerProjectRoutes({ teamId }: { teamId?: string }) {
  return useRoutes([
    { path: '', element: <ManagerProjectListFeature teamId={teamId} /> },
    {
      path: 'create',
      element: teamId ? <ManagerProjectCreateFeature teamId={teamId} /> : null,
    },
    { path: ':projectId/*', element: <ManagerProjectDetailFeature /> },
  ])
}
