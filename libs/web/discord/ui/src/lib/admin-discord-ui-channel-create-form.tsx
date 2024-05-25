import { DiscordChannel, DiscordServer } from '@deanslist-platform/sdk'
import { Group } from '@mantine/core'
import { UiCard, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'
import { AdminDiscordUiSelectChannels } from './admin-discord-ui-select-channels'
import { DiscordUiChannelCreateButton } from './discord-ui-channel-create-button'
import { DiscordUiServerSelect } from './discord-ui-server-select'

export function AdminDiscordUiChannelCreateForm({
  selected,
  refresh,
  submit,
  servers,
}: {
  selected: DiscordChannel[]
  servers: DiscordServer[]
  refresh: () => void
  submit: (input: { channelId: string; serverId: string }) => Promise<void>
}) {
  const [server, setServer] = useState<string | undefined>(undefined)
  const [channel, setChannel] = useState<string | undefined>(undefined)

  return (
    <UiCard>
      <UiStack>
        <DiscordUiServerSelect
          description={`Select a server `}
          server={server}
          servers={servers}
          setServer={setServer}
        />
        <AdminDiscordUiSelectChannels
          disabled={!server}
          channel={channel}
          serverId={server ?? ''}
          setChannel={setChannel}
          selected={selected}
        />
        <Group justify="flex-end">
          <DiscordUiChannelCreateButton
            refresh={refresh}
            disabled={!channel || !server}
            submit={() => submit({ channelId: channel as string, serverId: server as string })}
          />
        </Group>
      </UiStack>
    </UiCard>
  )
}
