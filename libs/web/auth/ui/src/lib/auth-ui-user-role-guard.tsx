import { UserRole } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { UiError } from '@pubkey-ui/core'
import { Outlet } from 'react-router-dom'
import { AuthUiFull } from './auth-ui-full'

export function AuthUiUserRoleGuard({ role }: { role: UserRole }) {
  const { user } = useAuth()

  return user?.role === role ? (
    <Outlet />
  ) : (
    <AuthUiFull>
      <UiError message={`You need the ${role} role`} />
    </AuthUiFull>
  )
}
