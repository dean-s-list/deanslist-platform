import { useAdminPingDiscordChannel } from '@deanslist-platform/web-discord-data-access'
import { Button, ButtonProps, Tooltip } from '@mantine/core'
import { IconHandFinger } from '@tabler/icons-react'

export function AdminDiscordUiChannelPingButton({
  channelId,
  serverId,
  ...props
}: ButtonProps & { channelId: string; serverId: string }) {
  const { mutation } = useAdminPingDiscordChannel({ channelId, serverId })

  return (
    <Tooltip label={mutation.isPending ? 'Pinging...' : 'Ping channel to test access'}>
      <Button
        leftSection={<IconHandFinger size={16} />}
        onClick={() => mutation.mutate()}
        loading={mutation.isPending}
        {...props}
      >
        Ping
      </Button>
    </Tooltip>
  )
}
