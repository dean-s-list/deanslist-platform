import { useSdk } from '@deanslist-platform/web-core-data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetDiscordBot() {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['adminGetDiscordBot'],
    queryFn: () => sdk.adminGetDiscordBot().then((res) => res.data),
  })

  const item = query?.data?.item

  return {
    query,
    item,
  }
}
