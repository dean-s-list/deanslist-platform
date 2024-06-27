import { useManagerGetProjectChannels } from '@deanslist-platform/web-discord-data-access'
import { SimpleGrid } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

import { ManagerProjectDetailChannel } from './manager-project-detail-channel'

export function ManagerProjectDetailChannelsTab({ projectId }: { projectId: string }) {
  const { items, query } = useManagerGetProjectChannels({ projectId })

  return query.isLoading ? (
    <UiLoader />
  ) : items.length ? (
    <UiStack>
      <UiInfo message="Project updates are announced in the channels below." />
      <SimpleGrid cols={{ base: 0, md: 2 }}>
        {items.map((item) => (
          <ManagerProjectDetailChannel key={item.id} channel={item} />
        ))}
      </SimpleGrid>
    </UiStack>
  ) : (
    <UiInfo message="No channels found." />
  )
}
