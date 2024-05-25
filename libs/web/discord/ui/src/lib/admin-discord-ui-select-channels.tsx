import { DiscordChannel } from '@deanslist-platform/sdk'
import { useAdminGetDiscordChannels } from '@deanslist-platform/web-discord-data-access'
import { SelectProps } from '@mantine/core'
import { DiscordUiChannelSelect } from './discord-ui-channel-select'

export function AdminDiscordUiSelectChannels({
  channel,
  serverId,
  selected,
  setChannel,
  ...props
}: Omit<SelectProps, 'data'> & {
  channel: string | undefined
  selected: DiscordChannel[]
  setChannel: (val: string | undefined) => void
  serverId: string
}) {
  const { items } = useAdminGetDiscordChannels({ serverId })

  return (
    <DiscordUiChannelSelect
      description={`Select a channel `}
      channel={channel}
      channels={items}
      selected={selected}
      setChannel={setChannel}
      {...props}
    />
  )
}
