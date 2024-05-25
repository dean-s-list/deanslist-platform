import { DiscordChannel } from '@deanslist-platform/sdk'
import { useGetDiscordChannelOptions } from '@deanslist-platform/web-discord-data-access'
import { Select, SelectProps } from '@mantine/core'

export function DiscordUiChannelSelect({
  channel,
  channels,
  setChannel,
  selected = [],
  ...props
}: Omit<SelectProps, 'data'> & {
  channel: string | undefined
  selected?: DiscordChannel[]
  setChannel: (val: string | undefined) => void
  channels: DiscordChannel[]
}) {
  const data = useGetDiscordChannelOptions({ channels, selected })

  return (
    <Select
      label="Channel"
      placeholder="Select or search channel..."
      data={data}
      searchable
      clearable
      nothingFoundMessage="Nothing found..."
      value={channel}
      onChange={(val) => setChannel(val ?? undefined)}
      {...props}
    />
  )
}
