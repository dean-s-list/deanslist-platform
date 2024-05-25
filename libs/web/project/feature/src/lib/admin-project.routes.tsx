import { useRoutes } from 'react-router-dom'
import { AdminProjectDetailFeature } from './admin-project-detail.feature'
import { AdminProjectListFeature } from './admin-project-list.feature'

export default function AdminProjectRoutes() {
  return useRoutes([
    { path: '', element: <AdminProjectListFeature /> },
    { path: ':projectId/*', element: <AdminProjectDetailFeature /> },
  ])
}
