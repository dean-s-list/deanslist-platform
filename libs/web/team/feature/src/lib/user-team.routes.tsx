import { useRoutes } from 'react-router-dom'
import { UserTeamDetailFeature } from './user-team-detail-feature'
import { UserTeamListFeature } from './user-team-list.feature'

export default function UserTeamRoutes() {
  return useRoutes([
    { path: '', element: <UserTeamListFeature /> },
    { path: ':teamId/*', element: <UserTeamDetailFeature /> },
  ])
}
