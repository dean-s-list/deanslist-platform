import { DiscordChannel } from '@deanslist-platform/sdk'
import { useManagerGetDiscordServers } from '@deanslist-platform/web-discord-data-access'
import { DiscordUiServerItem } from '@deanslist-platform/web-discord-ui'
import { Anchor, Group, Text, Tooltip } from '@mantine/core'
import { UiCard, UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'

export function ManagerProjectDetailChannel({ channel }: { channel: DiscordChannel }) {
  const { items: servers } = useManagerGetDiscordServers()
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
          <UiDebugModal data={channel} />
        </Group>
      </UiGroup>
    </UiCard>
  )
}
