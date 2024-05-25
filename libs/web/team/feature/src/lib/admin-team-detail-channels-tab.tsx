import {
  useAdminCreateTeamChannel,
  useAdminGetDiscordServers,
  useAdminGetTeamChannels,
} from '@deanslist-platform/web-discord-data-access'
import { AdminDiscordUiChannelCreateForm } from '@deanslist-platform/web-discord-ui'
import { Grid } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { AdminTeamDetailChannel } from './admin-team-detail-channel'

export function AdminTeamDetailChannelsTab({ teamId }: { teamId: string }) {
  const { items, query } = useAdminGetTeamChannels({ teamId })
  const { items: servers } = useAdminGetDiscordServers()
  const { mutation } = useAdminCreateTeamChannel({ teamId })

  return (
    <Grid>
      <Grid.Col span={6}>
        {query.isLoading ? (
          <UiLoader />
        ) : items.length ? (
          <UiStack>
            {items.map((item) => (
              <AdminTeamDetailChannel key={item.id} channel={item} refresh={() => query.refetch()} teamId={teamId} />
            ))}
          </UiStack>
        ) : (
          <UiInfo message="No channels found." />
        )}
      </Grid.Col>
      <Grid.Col span={6}>
        <UiStack>
          <UiInfo
            variant="outline"
            title="Subscribe to Team Updates"
            message="Select a server and channel to receive team updates."
          />
          <AdminDiscordUiChannelCreateForm
            servers={servers}
            selected={items}
            submit={({ serverId, channelId }) => mutation.mutateAsync({ serverId, channelId })}
            refresh={() => query.refetch()}
          />
        </UiStack>
      </Grid.Col>
    </Grid>
  )
}
