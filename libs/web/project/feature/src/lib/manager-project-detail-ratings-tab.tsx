import { ProjectStatus } from '@deanslist-platform/sdk'
import { ManagerCommentFeature } from '@deanslist-platform/web-comment-feature'
import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { UiError, UiLoader, UiStack, UiWarning } from '@pubkey-ui/core'

export function ManagerProjectDetailRatingsTab({ projectId }: { projectId: string }) {
  const { item, query } = useManagerFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <UiStack>
      {item.status !== ProjectStatus.Closed ? (
        <UiWarning variant="outline" message="You can manage ratings once the project is closed." />
      ) : (
        <ManagerCommentFeature projectId={projectId} />
      )}
    </UiStack>
  )
}
