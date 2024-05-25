import { UserCreateProjectInput } from '@deanslist-platform/sdk'
import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { useUserFindManyProject } from '@deanslist-platform/web-project-data-access'
import { UserProjectUiCreateForm } from '@deanslist-platform/web-project-ui'
import { toastError, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserProjectTeamCreateFeature({ teamId }: { teamId: string }) {
  const navigate = useNavigate()
  const { createProject } = useUserFindManyProject({ teamId })

  async function submit(input: UserCreateProjectInput) {
    return createProject(input)
      .then((res) => {
        if (res) {
          navigate(res.viewUrl)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<CoreUiBack />} title="Create Project">
      <UiCard>
        <UserProjectUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
