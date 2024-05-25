import {
  useAdminCreateProjectChannel,
  useAdminGetDiscordServers,
  useAdminGetProjectChannels,
} from '@deanslist-platform/web-discord-data-access'
import { AdminDiscordUiChannelCreateForm } from '@deanslist-platform/web-discord-ui'
import { Grid } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { AdminProjectDetailChannel } from './admin-project-detail-channel'

export function AdminProjectDetailChannelsTab({ projectId }: { projectId: string }) {
  const { items, query } = useAdminGetProjectChannels({ projectId })
  const { items: servers } = useAdminGetDiscordServers()
  const { mutation } = useAdminCreateProjectChannel({ projectId })

  return (
    <Grid>
      <Grid.Col span={6}>
        {query.isLoading ? (
          <UiLoader />
        ) : items.length ? (
          <UiStack>
            {items.map((item) => (
              <AdminProjectDetailChannel
                key={item.id}
                channel={item}
                refresh={() => query.refetch()}
                projectId={projectId}
              />
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
            title="Subscribe to Project Updates"
            message="Select a server and channel to receive project updates."
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
