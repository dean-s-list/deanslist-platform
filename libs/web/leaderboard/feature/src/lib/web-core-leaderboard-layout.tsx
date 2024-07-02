import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiHeader, CoreUiHeaderProfile, CoreUiLayout } from '@deanslist-platform/web-core-ui'
import { UiLoader } from '@pubkey-ui/core'
import { ReactNode, Suspense } from 'react'
import { IdentityUiLoginButton } from '@deanslist-platform/web-identity-ui'

export function WebCoreLeaderboardLayout({ children }: { children: ReactNode }) {
  const { logout, refresh, user, enabledProviders } = useAuth()

  return (
    <CoreUiLayout
      zIndex={50}
      header={
        <CoreUiHeader
          profile={
            user ? (
              <CoreUiHeaderProfile user={user} logout={logout} />
            ) : (
              <IdentityUiLoginButton provider={enabledProviders[0]} refresh={refresh} size="md" />
            )
          }
        />
      }
    >
      <Suspense fallback={<UiLoader mt="xl" size="xl" type="dots" />}>{children}</Suspense>
    </CoreUiLayout>
  )
}
