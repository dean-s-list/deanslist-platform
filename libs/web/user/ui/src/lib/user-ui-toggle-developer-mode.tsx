import { User, UserUpdateUserInput } from '@deanslist-platform/sdk'
import { Switch } from '@mantine/core'
import { toastInfo } from '@pubkey-ui/core'

export function UserUiToggleDeveloperMode({
  user,
  updateUser,
}: {
  user: User
  updateUser: (input: UserUpdateUserInput) => Promise<boolean>
}) {
  return (
    <Switch
      label="Developer Mode"
      description="Developer Mode exposes debug buttons helpful for people developing and testing the platform."
      checked={user?.developer ?? false}
      onChange={(e) =>
        updateUser({ developer: e.target.checked }).then(() => {
          toastInfo(`Developer mode ${e.target.checked ? 'enabled' : 'disabled'}`)
        })
      }
    />
  )
}
