import { DiscordChannel } from '@deanslist-platform/sdk'
import { useAdminGetDiscordChannels } from '@deanslist-platform/web-discord-data-access'
import { DiscordUiCategorySelect } from './discord-ui-category-select'
import { SelectProps } from '@mantine/core'

export function AdminDiscordUiSelectCategories({
  category,
  serverId,
  selected,
  setCategory,
  ...props
}: Omit<SelectProps, 'data'> & {
  category: string | undefined
  selected: DiscordChannel[]
  setCategory: (val: string | undefined) => void
  serverId: string
}) {
  const { items } = useAdminGetDiscordChannels({ serverId })

  return (
    <DiscordUiCategorySelect
      description={`Select a category`}
      category={category}
      channels={items}
      selected={selected}
      setCategory={setCategory}
      {...props}
    />
  )
}
