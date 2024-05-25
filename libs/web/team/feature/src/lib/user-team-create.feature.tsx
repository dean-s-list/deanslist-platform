import { UserCreateTeamInput } from '@deanslist-platform/sdk'
import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { useUserFindManyTeam } from '@deanslist-platform/web-team-data-access'
import { UserTeamUiCreateForm } from '@deanslist-platform/web-team-ui'
import { toastError, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserTeamCreateFeature() {
  const navigate = useNavigate()
  const { createTeam } = useUserFindManyTeam()

  async function submit(input: UserCreateTeamInput) {
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
        <UserTeamUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
