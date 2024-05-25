import { DiscordServer } from '@deanslist-platform/sdk'
import { useAdminLeaveDiscordServer } from '@deanslist-platform/web-discord-data-access'
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'

export function AdminDiscordBotLeaveButton({ server, refresh }: { server: DiscordServer; refresh: () => void }) {
  const { mutation } = useAdminLeaveDiscordServer({ serverId: server.id })
  return (
    <Button
      color="red"
      variant="subtle"
      loading={mutation.isPending}
      onClick={() =>
        modals.openConfirmModal({
          title: 'Leave Server',
          children: `Are you sure you want to leave ${server.name}?`,
          labels: { confirm: 'Leave', cancel: 'Cancel' },
          confirmProps: { loading: mutation.isPending },
          onConfirm: () => mutation.mutateAsync().then(() => refresh()),
        })
      }
    >
      Leave Server
    </Button>
  )
}
