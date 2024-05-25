import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetDiscordChannels({ serverId }: { serverId: string }) {
  const sdk = useSdk()
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
