import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { useUserFindManyIdentity } from '@deanslist-platform/web-identity-data-access'
import { IdentityUiGroupList } from '@deanslist-platform/web-identity-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'

export function SettingsIdentityFeature() {
  const { user } = useAuth()
  const { deleteIdentity, grouped, query, setPrimaryIdentity } = useUserFindManyIdentity({
    username: user?.username as string,
  })

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <IdentityUiGroupList
          grouped={grouped}
          deleteIdentity={deleteIdentity}
          refresh={() => query.refetch()}
          setPrimary={setPrimaryIdentity}
        />
      )}
    </UiStack>
  )
}
