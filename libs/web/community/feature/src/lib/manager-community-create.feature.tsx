import { ManagerCreateCommunityInput } from '@deanslist-platform/sdk'
import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { useManagerFindManyCommunity } from '@deanslist-platform/web-community-data-access'
import { ManagerCommunityUiCreateForm } from '@deanslist-platform/web-community-ui'
import { toastError, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function ManagerCommunityCreateFeature() {
  const navigate = useNavigate()
  const { createCommunity } = useManagerFindManyCommunity()

  async function submit(input: ManagerCreateCommunityInput) {
    return createCommunity(input)
      .then((res) => {
        if (res) {
          navigate(`/communities/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<CoreUiBack />} title="Create Community">
      <UiCard>
        <ManagerCommunityUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
