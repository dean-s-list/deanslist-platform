import { ellipsify, Identity } from '@deanslist-platform/sdk'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { ActionIcon, Badge, Box, Group, Image, Menu, Paper, Text } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { IconDotsVertical, IconExternalLink, IconStarFilled, IconTrash } from '@tabler/icons-react'
import { IdentityUiSolanaVerifyButton } from './identity-ui-solana-verify-button'
import { IdentityUiVerified } from './identity-ui-verified'

export function IdentityUiWalletList({
  deleteIdentity,
  items,
  refresh,
  setPrimary,
}: {
  deleteIdentity?: (id: string) => void
  items: Identity[]
  refresh?: () => void
  setPrimary: (id: string) => void
}) {
  return (
    <UiStack>
      {items?.map((item) => (
        <Paper withBorder key={item.id} bg="transparent" radius="md" p="sm">
          <Group justify="space-between">
            <Group>
              <Box
                style={{ border: '1px solid black', backgroundColor: 'black', borderRadius: '50%', overflow: 'hidden' }}
                p="xs"
              >
                <Image h={18} bg="black" src="/assets/solana-logo-mark.png" />
              </Box>

              <UiGroup gap="xs" align="center">
                {item.profile?.username ? (
                  <Text size="lg" display="flex">
                    {item.profile?.username}
                  </Text>
                ) : (
                  <Text ff="mono" size="sm">
                    {ellipsify(item.providerId)}
                  </Text>
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
                {item.primary ? (
                  <Badge size="xs" variant="default" leftSection={<IconStarFilled size={10} />}>
                    Primary wallet
                  </Badge>
                ) : null}
              </UiGroup>
            </Group>
            <Group gap="xs">
              <CoreUiDebugModal data={item} />
              {deleteIdentity && (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon variant="light" size="sm">
                      <IconDotsVertical size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      component={'a'}
                      href={`https://solana.fm/address/${item.providerId}`}
                      target="_blank"
                      leftSection={<IconExternalLink size={14} />}
                    >
                      View on solana.fm
                    </Menu.Item>
                    <Menu.Item
                      disabled={!!item.primary}
                      leftSection={<IconStarFilled size={14} />}
                      onClick={() => setPrimary(item.id)}
                    >
                      Set as primary
                    </Menu.Item>
                    <Menu.Item
                      disabled={!!item.primary}
                      color="red"
                      leftSection={<IconTrash size={14} />}
                      onClick={() => deleteIdentity(item.id)}
                    >
                      Remove
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Group>
        </Paper>
      ))}
    </UiStack>
  )
}
