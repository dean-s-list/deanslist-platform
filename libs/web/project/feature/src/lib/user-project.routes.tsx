import { useRoutes } from 'react-router-dom'
import { UserProjectDetailFeature } from './user-project-detail.feature'
import UserProjectListFeature from './user-project-list.feature'

export default function UserProjectRoutes() {
  return useRoutes([
    { path: '', element: <UserProjectListFeature /> },
    { path: ':projectId/*', element: <UserProjectDetailFeature /> },
  ])
}
