import { useUserFindOneProject } from '@deanslist-platform/web-project-data-access'
import { UiError, UiLoader } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserProjectDetailPage } from './user-project-detail-page'

export function UserProjectDetailFeature() {
  const { projectId } = useParams<{ projectId: string }>() as { projectId: string }
  const { item, query } = useUserFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return <UserProjectDetailPage project={item} />
}
