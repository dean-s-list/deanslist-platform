import { AdminUpdateProjectInput } from '@deanslist-platform/sdk'
import { useAdminFindOneProject } from '@deanslist-platform/web-project-data-access'
import { AdminProjectUiUpdateForm } from '@deanslist-platform/web-project-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminProjectDetailSettingsTab({ projectId }: { projectId: string }) {
  const { item, query, updateProject } = useAdminFindOneProject({ projectId })
  const navigate = useNavigate()

  async function update(input: AdminUpdateProjectInput) {
    return updateProject(input).then((res) => {
      if (res?.communityId && res?.communityId !== item?.communityId) {
        navigate(`/admin/communities/${res.communityId}/projects/${res.id}/settings`)
      }
      return !!res
    })
  }
  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <UiCard>
      <AdminProjectUiUpdateForm project={item} submit={update} />
    </UiCard>
  )
}
