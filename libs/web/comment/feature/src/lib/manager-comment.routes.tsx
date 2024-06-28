import { useRoutes } from 'react-router-dom'
import { ManagerCommentListFeature } from './manager-comment-list.feature'

export default function ManagerCommentRoutes({ projectId }: { projectId: string }) {
  return useRoutes([{ path: '', element: <ManagerCommentListFeature projectId={projectId} /> }])
}
