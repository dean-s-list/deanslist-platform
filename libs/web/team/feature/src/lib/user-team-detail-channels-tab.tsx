import { useUserGetTeamChannels } from '@deanslist-platform/web-discord-data-access'
import { SimpleGrid } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { UserTeamDetailChannel } from './user-team-detail-channel'

export function UserTeamDetailChannelsTab({ teamId }: { teamId: string }) {
  const { items, query } = useUserGetTeamChannels({ teamId })

  return query.isLoading ? (
    <UiLoader />
  ) : items.length ? (
    <UiStack>
      <UiInfo message="Team updates are announced in the channels below." />
      <SimpleGrid cols={{ base: 0, md: 2 }}>
        {items.map((item) => (
          <UserTeamDetailChannel key={item.id} channel={item} />
        ))}
      </SimpleGrid>
    </UiStack>
  ) : (
    <UiInfo message="No channels found." />
  )
}
