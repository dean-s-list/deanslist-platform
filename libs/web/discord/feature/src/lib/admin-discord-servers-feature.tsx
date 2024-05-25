import { useAdminGetDiscordServers } from '@deanslist-platform/web-discord-data-access'
import { DiscordUiServerItem } from '@deanslist-platform/web-discord-ui'
import { Accordion } from '@mantine/core'
import { UiLoader, UiStack } from '@pubkey-ui/core'
import { AdminDiscordServersCard } from './admin-discord-servers-card'

export function AdminDiscordServersFeature() {
  const { query, items } = useAdminGetDiscordServers()

  return (
    <div>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          <Accordion variant="separated" multiple defaultValue={items.map((item) => item.id)}>
            {items.map((item) => (
              <Accordion.Item value={item.id} key={item.id}>
                <Accordion.Control>
                  <DiscordUiServerItem server={item} />
                </Accordion.Control>
                <Accordion.Panel>
                  <AdminDiscordServersCard server={item} refresh={() => query.refetch()} />
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </UiStack>
      )}
    </div>
  )
}
