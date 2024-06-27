import { DiscordServer } from '@deanslist-platform/sdk'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { useAdminGetDiscordChannels } from '@deanslist-platform/web-discord-data-access'
import { AdminDiscordUiChannelPingButton, DiscordUiChannelSelect } from '@deanslist-platform/web-discord-ui'
import { Fieldset, Grid, Group, Text } from '@mantine/core'
import { UiDebugModal, UiLoader, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'
import { AdminDiscordBotLeaveButton } from './admin-discord-bot-leave-button'
import { AdminDiscordServerProjectChannels } from './admin-discord-server-project-channels'

export function AdminDiscordServersCard({ server, refresh }: { server: DiscordServer; refresh: () => void }) {
  const { query, items } = useAdminGetDiscordChannels({ serverId: server.id })
  const [channel, setChannel] = useState<string | undefined>(undefined)

  return (
    <div>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <UiStack>
                <AdminDiscordServerProjectChannels server={server} items={items} />
              </UiStack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <UiStack>
                <Fieldset legend="Server information">
                  <UiStack>
                    <Text>Channels: {items.length}</Text>
                  </UiStack>
                </Fieldset>
                <Fieldset legend="Channel connection">
                  <UiStack>
                    <DiscordUiChannelSelect
                      description={`Select a channel to ping on ${server.name}`}
                      channel={channel}
                      channels={items}
                      setChannel={setChannel}
                    />
                    <Group justify="end">
                      <AdminDiscordUiChannelPingButton
                        disabled={!channel}
                        serverId={server.id}
                        channelId={channel ?? ''}
                      />
                    </Group>
                  </UiStack>
                </Fieldset>
              </UiStack>
            </Grid.Col>
          </Grid>
          <Group justify="end" gap="xs">
            <CoreUiDebugModal data={{ server }} />
            <AdminDiscordBotLeaveButton server={server} refresh={refresh} />
          </Group>
        </UiStack>
      )}
    </div>
  )
}
