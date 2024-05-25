import { useAdminPingDiscordChannel } from '@deanslist-platform/web-discord-data-access'
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'
import { IconHandFinger } from '@tabler/icons-react'

export function AdminDiscordUiChannelPingIcon({
  channelId,
  serverId,
  ...props
}: ActionIconProps & { channelId: string; serverId: string }) {
  const { mutation } = useAdminPingDiscordChannel({ channelId, serverId })

  return (
    <Tooltip label={mutation.isPending ? 'Pinging...' : 'Ping channel to test access'}>
      <ActionIcon variant="light" size="sm" onClick={() => mutation.mutate()} loading={mutation.isPending} {...props}>
        <IconHandFinger size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
