import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ManagerProjectUiUpdateStatusForm } from '@deanslist-platform/web-project-ui'
import { UiError, UiLoader } from '@pubkey-ui/core'

export function ManagerProjectDetailStatusTab({ projectId }: { projectId: string }) {
  const { item, query, updateProjectStatus } = useManagerFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return <ManagerProjectUiUpdateStatusForm project={item} submit={updateProjectStatus} />
}
