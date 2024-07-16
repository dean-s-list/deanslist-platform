import { DiscordChannel } from '@deanslist-platform/sdk'
import { CoreUiCard, CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { useManagerGetDiscordServers } from '@deanslist-platform/web-discord-data-access'
import { DiscordUiServerItem } from '@deanslist-platform/web-discord-ui'
import { Anchor, Group, Text, Tooltip } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'

export function ManagerProjectDetailChannel({ channel }: { channel: DiscordChannel }) {
  const { items: servers } = useManagerGetDiscordServers()
  const server = servers.find((server) => server.id === channel.guildId)

  return (
    <CoreUiCard key={channel.id}>
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
          <CoreUiDebugModal data={channel} />
        </Group>
      </UiGroup>
    </CoreUiCard>
  )
}
