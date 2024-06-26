import { ManagerCreateTeamInput } from '@deanslist-platform/sdk'
import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { useManagerFindManyTeam } from '@deanslist-platform/web-team-data-access'
import { ManagerTeamUiCreateForm } from '@deanslist-platform/web-team-ui'
import { toastError, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function ManagerTeamCreateFeature() {
  const navigate = useNavigate()
  const { createTeam } = useManagerFindManyTeam()

  async function submit(input: ManagerCreateTeamInput) {
    return createTeam(input)
      .then((res) => {
        if (res) {
          navigate(`/teams/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<CoreUiBack />} title="Create Team">
      <UiCard>
        <ManagerTeamUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
