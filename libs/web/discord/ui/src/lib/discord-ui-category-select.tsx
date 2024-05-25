import { DiscordChannel } from '@deanslist-platform/sdk'
import { Select, SelectProps } from '@mantine/core'

export function DiscordUiCategorySelect({
  category,
  channels,
  setCategory,
  selected = [],
  ...props
}: Omit<SelectProps, 'data'> & {
  category: string | undefined
  selected?: DiscordChannel[]
  setCategory: (val: string | undefined) => void
  channels: DiscordChannel[]
}) {
  const selectedIds = selected.map((channel) => channel.id)
  const data = channels
    .filter((channel) => channel.type === 'GuildCategory')
    .map((channel) => ({
      value: channel.id,
      label: channel.name,
      disabled: selectedIds.includes(channel.id),
    }))

  return (
    <Select
      label="Channel"
      placeholder="Select or search channel..."
      data={data}
      searchable
      clearable
      nothingFoundMessage="Nothing found..."
      value={category}
      onChange={(val) => setCategory(val ?? undefined)}
      {...props}
    />
  )
}
