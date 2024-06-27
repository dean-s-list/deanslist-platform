import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { useAdminGetDiscordBot } from '@deanslist-platform/web-discord-data-access'
import { DiscordUiBotItem } from '@deanslist-platform/web-discord-ui'
import { Group, Paper } from '@mantine/core'
import { UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { AdminDiscordServersFeature } from './admin-discord-servers-feature'
import { DiscordUiBotInviteButton } from './discord-ui-bot-invite-button'
import { DiscordUiBotManageButton } from './discord-ui-bot-manage-button'

export function AdminDiscordBotFeature() {
  const { item, query } = useAdminGetDiscordBot()

  return (
    <div>
      {query.isLoading ? (
        <UiLoader />
      ) : item ? (
        <UiStack>
          <Paper withBorder p="md">
            <UiGroup>
              <DiscordUiBotItem bot={item} />
              <Group>
                <CoreUiDebugModal data={item} />
                <DiscordUiBotManageButton item={item} />
                <DiscordUiBotInviteButton item={item} />
              </Group>
            </UiGroup>
          </Paper>
          <AdminDiscordServersFeature />
        </UiStack>
      ) : (
        <UiInfo message="No bot found. Please add a bot to the system." />
      )}
    </div>
  )
}
