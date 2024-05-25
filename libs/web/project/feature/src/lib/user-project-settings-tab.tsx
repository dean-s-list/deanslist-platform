import { useUserFindOneProject } from '@deanslist-platform/web-project-data-access'
import { UserProjectUiUpdateForm } from '@deanslist-platform/web-project-ui'
import { UiError, UiLoader } from '@pubkey-ui/core'

export function UserProjectSettingsTab({ projectId }: { projectId: string }) {
  const { item, query, updateProject } = useUserFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return <UserProjectUiUpdateForm project={item} submit={updateProject} />
}
