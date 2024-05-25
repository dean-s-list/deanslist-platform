import { DiscordServer } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetDiscordServers() {
  const sdk = useSdk()
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
