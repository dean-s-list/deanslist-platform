import { IdentityProvider } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { useUserFindManyIdentity } from '@deanslist-platform/web-identity-data-access'
import { identityLinkSolanaModal, IdentityUiWalletList } from '@deanslist-platform/web-identity-ui'
import { Button, Group, Text } from '@mantine/core'
import { UiLoader, UiStack } from '@pubkey-ui/core'
import { IconPlus } from '@tabler/icons-react'
import { useMemo } from 'react'

export function SettingsWalletsFeature() {
  const { user } = useAuth()
  const { deleteIdentity, items, query, setPrimaryIdentity } = useUserFindManyIdentity({
    username: user?.username as string,
  })

  async function refresh() {
    await query.refetch()
  }

  const identities = useMemo(() => {
    return items.filter((item) => item.provider === IdentityProvider.Solana)
  }, [items])

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          <Group justify="space-between">
            <Text fz="xl" fw={500}>
              Connected wallets
            </Text>
            <Button
              variant="subtle"
              leftSection={<IconPlus size={16} />}
              onClick={() => {
                identityLinkSolanaModal({ identities, refresh })
              }}
            >
              Add Wallet
            </Button>
          </Group>
          {identities?.length ? (
            <IdentityUiWalletList
              items={identities}
              refresh={refresh}
              deleteIdentity={deleteIdentity}
              setPrimary={(id) => setPrimaryIdentity(id)}
            />
          ) : null}
        </UiStack>
      )}
    </UiStack>
  )
}
