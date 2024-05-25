import { useRoutes } from 'react-router-dom'
import { UserTeamCreateFeature } from './user-team-create.feature'
import { UserTeamDetailFeature } from './user-team-detail.feature'
import { UserTeamListFeature } from './user-team-list.feature'

export default function UserTeamRoutes() {
  return useRoutes([
    { path: '', element: <UserTeamListFeature /> },
    {
      path: 'create',
      element: <UserTeamCreateFeature />,
    },
    { path: ':teamId/*', element: <UserTeamDetailFeature /> },
  ])
}
