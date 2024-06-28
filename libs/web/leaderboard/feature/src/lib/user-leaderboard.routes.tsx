import { useRoutes } from 'react-router-dom'
import { UserLeaderboardFeature } from './user-leaderboard.feature'

export default function UserLeaderboardRoutes() {
  return useRoutes([{ path: '', element: <UserLeaderboardFeature /> }])
}
