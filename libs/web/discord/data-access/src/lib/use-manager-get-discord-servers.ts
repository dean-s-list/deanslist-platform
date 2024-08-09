import { DiscordServer, sdk } from '@deanslist-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useManagerGetDiscordServers() {
  const query = useQuery({
    queryKey: ['userGetDiscordServers'],
    queryFn: () => sdk.userGetDiscordServers().then((res) => res.data),
  })

  const items: DiscordServer[] = query?.data?.items ?? []

  return {
    query,
    items,
  }
}
