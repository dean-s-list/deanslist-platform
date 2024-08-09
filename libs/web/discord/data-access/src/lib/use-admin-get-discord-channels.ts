import { sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetDiscordChannels({ serverId }: { serverId: string }) {
  const query = useQuery({
    queryKey: ['adminGetDiscordChannels', { serverId }],
    queryFn: () => sdk.adminGetDiscordChannels({ serverId }).then((res) => res.data),
  })

  const items = query.data?.items || []

  return {
    query,
    items,
  }
}
