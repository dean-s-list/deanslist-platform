import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthUiOnboardedGuard({ redirectTo }: { redirectTo: string }) {
  const { isOnboarded } = useAuth()

  return isOnboarded ? <Outlet /> : <Navigate replace to={redirectTo} />
}
