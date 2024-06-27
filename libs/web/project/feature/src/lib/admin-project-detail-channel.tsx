import { DiscordChannel } from '@deanslist-platform/sdk'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { useAdminGetDiscordServers } from '@deanslist-platform/web-discord-data-access'
import {
  AdminDiscordUiChannelPingIcon,
  AdminDiscordUiProjectChannelDeleteButton,
  DiscordUiServerItem,
} from '@deanslist-platform/web-discord-ui'
import { Anchor, Group, Text, Tooltip } from '@mantine/core'
import { UiCard, UiGroup, UiStack } from '@pubkey-ui/core'

export function AdminProjectDetailChannel({
  projectId,
  channel,
  refresh,
}: {
  projectId: string
  channel: DiscordChannel
  refresh: () => void
}) {
  const { items: servers } = useAdminGetDiscordServers()
  const server = servers.find((server) => server.id === channel.guildId)

  return (
    <UiCard key={channel.id}>
      <UiGroup>
        <UiStack>
          <DiscordUiServerItem server={server}>
            <Text size="sm" span>
              <Text span c="dimmed">
                #
              </Text>{' '}
              <Tooltip label={`Open ${channel.name} in Discord`}>
                <Anchor
                  href={`https://discord.com/channels/${channel.guildId}/${channel.id}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {channel.name}
                </Anchor>
              </Tooltip>
            </Text>
          </DiscordUiServerItem>
        </UiStack>
        <Group gap="xs">
          <AdminDiscordUiChannelPingIcon channelId={channel.id} serverId={channel.guildId ?? ''} />
          <CoreUiDebugModal data={channel} />
          <AdminDiscordUiProjectChannelDeleteButton
            size="sm"
            projectId={projectId}
            refresh={refresh}
            channelId={channel.id}
          />
        </Group>
      </UiGroup>
    </UiCard>
  )
}
