import { ManagerCommentFeature } from '@deanslist-platform/web-comment-feature'
import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { UiError, UiLoader } from '@pubkey-ui/core'

export function ManagerProjectDetailRatingsTab({ projectId }: { projectId: string }) {
  const { item, query } = useManagerFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return <ManagerCommentFeature projectId={projectId} />
}
