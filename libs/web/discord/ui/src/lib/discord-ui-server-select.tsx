import { DiscordServer } from '@deanslist-platform/sdk'
import { Select, SelectProps } from '@mantine/core'

export function DiscordUiServerSelect({
  server,
  servers,
  setServer,
  ...props
}: Omit<SelectProps, 'data'> & {
  server: string | undefined
  setServer: (val: string | undefined) => void
  servers: DiscordServer[]
}) {
  const data = servers
    .map((server) => ({
      value: server.id,
      label: server.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  return (
    <Select
      label="Server"
      placeholder="Select or search server..."
      data={data}
      value={server}
      onChange={(val) => setServer(val ?? undefined)}
      {...props}
      searchable
      clearable
      nothingFoundMessage="Nothing found..."
      {...props}
    />
  )
}
