import { DiscordChannel } from '@deanslist-platform/sdk'
import { ComboboxItemGroup } from '@mantine/core'

export function useGetDiscordChannelOptions({
  channels,
  selected,
}: {
  channels: DiscordChannel[]
  selected: DiscordChannel[]
}) {
  const selectedIds = selected.map((channel) => channel.id)
  return channels
    .filter((channel) => channel.type === 'GuildCategory')
    .reduce(
      (acc, group) => {
        return [
          ...acc,
          {
            group: group.name,
            items: channels
              .filter((channel) => channel.parentId === group.id)
              .map((channel) => ({
                value: channel.id,
                label: channel.name,
                disabled: selectedIds.includes(channel.id) || channel.type !== 'GuildText',
              })),
          },
        ].filter((group) => group.items.length)
      },
      [
        {
          group: 'Top Level',
          items: channels
            .filter((channel) => channel.type !== 'GuildCategory' && !channel.parentId)
            .map((channel) => ({
              value: channel.id,
              label: channel.name,
              disabled: selectedIds.includes(channel.id) || channel.type !== 'GuildText',
            })),
        },
      ] as ComboboxItemGroup[],
    )
}
