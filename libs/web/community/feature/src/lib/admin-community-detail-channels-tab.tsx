import {
  useAdminCreateCommunityChannel,
  useAdminGetDiscordServers,
  useAdminGetCommunityChannels,
} from '@deanslist-platform/web-discord-data-access'
import { AdminDiscordUiChannelCreateForm } from '@deanslist-platform/web-discord-ui'
import { Grid } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { AdminCommunityDetailChannel } from './admin-community-detail-channel'

export function AdminCommunityDetailChannelsTab({ communityId }: { communityId: string }) {
  const { items, query } = useAdminGetCommunityChannels({ communityId })
  const { items: servers } = useAdminGetDiscordServers()
  const { mutation } = useAdminCreateCommunityChannel({ communityId })

  return (
    <Grid>
      <Grid.Col span={6}>
        {query.isLoading ? (
          <UiLoader />
        ) : items.length ? (
          <UiStack>
            {items.map((item) => (
              <AdminCommunityDetailChannel
                key={item.id}
                channel={item}
                refresh={() => query.refetch()}
                communityId={communityId}
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
            title="Subscribe to Community Updates"
            message="Select a server and channel to receive community updates."
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
