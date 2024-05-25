import { DiscordChannel, DiscordServer } from '@deanslist-platform/sdk'
import { useAdminUpdateDiscordServer } from '@deanslist-platform/web-discord-data-access'
import { DiscordUiCategorySelect, DiscordUiChannelSelect } from '@deanslist-platform/web-discord-ui'
import { Button, Checkbox, Fieldset, Group, Text } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

export function AdminDiscordServerProjectChannels({
  server,
  items,
}: {
  server: DiscordServer
  items: DiscordChannel[]
}) {
  const { mutation } = useAdminUpdateDiscordServer({ serverId: server.id })
  const [logChannelId, setlogChannelId] = useState<string | undefined>(server?.logChannelId ?? undefined)
  const [projectCategoryId, setProjectCategoryId] = useState<string | undefined>(server?.projectCategoryId ?? undefined)
  const [teamCategoryId, setTeamCategoryId] = useState<string | undefined>(server?.teamCategoryId ?? undefined)
  const [createChannels, setCreateChannels] = useState<boolean>(server?.createChannels ?? false)

  return (
    <Fieldset legend="Channels">
      <UiStack>
        <UiStack gap="xs">
          <Text size="sm" c="dimmed">
            Log channel is where all the logs will be sent. You can select a channel from the server.
          </Text>
        </UiStack>

        <DiscordUiChannelSelect
          label="Log Channel"
          description="Select the log channel"
          channel={logChannelId}
          channels={items}
          setChannel={setlogChannelId}
        />

        <UiStack gap="xs">
          <Text size="sm" c="dimmed">
            Automatically create channels for projects and teams inside this server. You can select the category for
            project channels and team channels.
          </Text>
        </UiStack>
        <Checkbox
          label="Create Channels"
          description={`If checked, new channels will be created.`}
          checked={createChannels}
          disabled={mutation.isPending}
          onChange={(event) => setCreateChannels(event.currentTarget.checked)}
        />
        <DiscordUiCategorySelect
          disabled={!createChannels}
          label="Project Category"
          description={`Select the category for project channels`}
          category={projectCategoryId}
          channels={items}
          setCategory={setProjectCategoryId}
        />
        <DiscordUiCategorySelect
          disabled={!createChannels}
          label="Team Category"
          description={`Select the category for team channels`}
          category={teamCategoryId}
          channels={items}
          setCategory={setTeamCategoryId}
        />
        <Group justify="end">
          <Button
            loading={mutation.isPending}
            variant="light"
            onClick={() =>
              mutation.mutate({
                createChannels,
                logChannelId: logChannelId ?? null,
                projectCategoryId: projectCategoryId ?? null,
                teamCategoryId: teamCategoryId ?? null,
              })
            }
          >
            Save
          </Button>
        </Group>
      </UiStack>
    </Fieldset>
  )
}
