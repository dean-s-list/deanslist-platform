import { AdminCreateUserInput } from '@deanslist-platform/sdk'
import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { useAdminFindManyUser } from '@deanslist-platform/web-user-data-access'
import { AdminUiCreateUserForm } from '@deanslist-platform/web-user-ui'
import { toastError, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function AdminUserCreateFeature() {
  const navigate = useNavigate()
  const { createUser } = useAdminFindManyUser()

  async function submit(input: AdminCreateUserInput) {
    return createUser(input)
      .then((res) => {
        if (res?.id) {
          navigate(`/admin/users/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<CoreUiBack />} title="Create User">
      <UiCard>
        <AdminUiCreateUserForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
