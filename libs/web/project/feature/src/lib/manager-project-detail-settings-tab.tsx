import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ManagerProjectUiUpdateForm } from '@deanslist-platform/web-project-ui'
import { UiError, UiLoader } from '@pubkey-ui/core'

export function ManagerProjectDetailSettingsTab({ projectId }: { projectId: string }) {
  const { item, query, updateProject } = useManagerFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return <ManagerProjectUiUpdateForm project={item} submit={updateProject} />
}
