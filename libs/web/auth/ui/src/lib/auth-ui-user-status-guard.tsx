import { UserStatus } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { Button } from '@mantine/core'
import { UiStack, UiWarning } from '@pubkey-ui/core'
import { Outlet } from 'react-router-dom'
import { AuthUiFull } from './auth-ui-full'

export function AuthUiUserStatusGuard({ status }: { status: UserStatus }) {
  const { user, logout } = useAuth()

  return user?.status === status ? (
    <Outlet />
  ) : (
    <AuthUiFull>
      <UiStack>
        <UiWarning message={`Your account is not ${status.toLowerCase()}.`} />
        <Button onClick={() => logout()} variant="light">
          Logout
        </Button>
      </UiStack>
    </AuthUiFull>
  )
}
