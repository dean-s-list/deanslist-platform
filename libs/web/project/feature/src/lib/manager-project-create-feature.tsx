import { ManagerCreateProjectInput } from '@deanslist-platform/sdk'
import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { useManagerFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ManagerProjectUiCreateForm } from '@deanslist-platform/web-project-ui'
import { toastError, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function ManagerProjectCreateFeature({ communityId }: { communityId: string }) {
  const navigate = useNavigate()
  const { createProject } = useManagerFindManyProject({ communityId })

  async function submit(input: ManagerCreateProjectInput) {
    return createProject(input)
      .then((res) => {
        if (res) {
          navigate(`../${res.id}`)
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
        <ManagerProjectUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
