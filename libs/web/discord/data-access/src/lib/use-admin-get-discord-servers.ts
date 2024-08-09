import { DiscordServer, sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetDiscordServers() {
  const query = useQuery({
    queryKey: ['adminGetDiscordServers'],
    queryFn: () => sdk.adminGetDiscordServers().then((res) => res.data),
  })

  const items: DiscordServer[] = query?.data?.items ?? []

  return {
    query,
    items,
  }
}
