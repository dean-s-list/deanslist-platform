import { ellipsify, Identity } from '@deanslist-platform/sdk'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { ActionIcon, Badge, Code, Group, Menu, Text } from '@mantine/core'
import { UiCard, UiGroup, UiStack } from '@pubkey-ui/core'
import { IconDotsVertical, IconTrash } from '@tabler/icons-react'
import { IdentityUiAvatar } from './identity-ui-avatar'
import { IdentityUiLink } from './identity-ui-link'
import { IdentityUiSetPrimary } from './identity-ui-set-primary'
import { IdentityUiSolanaVerifyButton } from './identity-ui-solana-verify-button'
import { IdentityUiVerified } from './identity-ui-verified'

export function IdentityUiList({
  deleteIdentity,
  items,
  refresh,
  setPrimary,
}: {
  deleteIdentity?: (id: string) => void
  items: Identity[]
  refresh?: () => void
  setPrimary?: (id: string) => void
}) {
  return (
    <UiStack>
      {items?.map((item) => (
        <UiCard key={item.id}>
          <Group justify="space-between">
            <Group>
              <IdentityUiAvatar item={item} />
              <UiGroup gap="xs" align="center">
                {item.profile?.username ? (
                  <Text size="lg" display="flex">
                    {item.profile?.username}
                  </Text>
                ) : (
                  <Code>{ellipsify(item.providerId)}</Code>
                )}
                {item.verified ? (
                  <IdentityUiVerified item={item} />
                ) : refresh ? (
                  <IdentityUiSolanaVerifyButton identity={item} refresh={refresh} />
                ) : (
                  <Badge variant="light" color="yellow">
                    Not verified
                  </Badge>
                )}
                {setPrimary ? <IdentityUiSetPrimary item={item} setPrimary={setPrimary} /> : null}
              </UiGroup>
            </Group>
            <Group gap="xs">
              <CoreUiDebugModal data={item} />
              <IdentityUiLink item={item} />
              {deleteIdentity && (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="light" size="sm">
                      <IconDotsVertical size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                      color="red"
                      leftSection={<IconTrash size={14} />}
                      onClick={() => deleteIdentity(item.id)}
                    >
                      Remove this identity
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Group>
        </UiCard>
      ))}
    </UiStack>
  )
}
