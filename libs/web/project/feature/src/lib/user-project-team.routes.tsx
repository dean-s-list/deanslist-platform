import { useRoutes } from 'react-router-dom'
import { UserProjectTeamCreateFeature } from './user-project-team-create-feature'
import { UserProjectTeamListFeature } from './user-project-team-list-feature'

export default function UserProjectTeamRoutes({ teamId }: { teamId: string }) {
  return useRoutes([
    { path: '', element: <UserProjectTeamListFeature teamId={teamId} /> },
    {
      path: 'create',
      element: <UserProjectTeamCreateFeature teamId={teamId} />,
    },
  ])
}
