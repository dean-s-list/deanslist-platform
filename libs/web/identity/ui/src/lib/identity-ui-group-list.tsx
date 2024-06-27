import { Identity, IdentityProvider } from '@deanslist-platform/sdk'
import { Group, Text } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { IdentityUiIcon } from './identity-ui-icon'

import { IdentityUiLinkButton } from './identity-ui-link-button'
import { IdentityUiList } from './identity-ui-list'

export function IdentityUiGroupList({
  deleteIdentity,
  grouped,
  refresh,
  setPrimary,
}: {
  deleteIdentity?: (id: string) => void
  grouped: { provider: IdentityProvider; items: Identity[] }[]
  refresh?: () => void
  setPrimary?: (id: string) => void
}) {
  return (
    <UiStack gap="lg">
      {grouped.map((group) => (
        <UiStack key={group.provider}>
          <Group justify="space-between">
            <Group pl="lg">
              <IdentityUiIcon provider={group.provider} />
              <Text size="xl">{group.provider}</Text>
            </Group>
            <IdentityUiLinkButton
              identities={group.items}
              refresh={refresh}
              provider={group.provider}
              size="sm"
              w={210}
            />
          </Group>
          {group.items?.length ? (
            <IdentityUiList
              items={group.items}
              refresh={refresh}
              deleteIdentity={deleteIdentity}
              setPrimary={setPrimary}
            />
          ) : null}
        </UiStack>
      ))}
    </UiStack>
  )
}
