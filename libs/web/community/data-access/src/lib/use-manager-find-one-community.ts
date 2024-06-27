import { ManagerUpdateCommunityInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useManagerFindOneCommunity({ communityId }: { communityId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['manager', 'find-one-community', communityId],
    queryFn: () => sdk.managerFindOneCommunity({ communityId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateCommunity: async (input: ManagerUpdateCommunityInput) =>
      sdk
        .managerUpdateCommunity({ communityId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Community updated')
            await query.refetch()
            return true
          }
          toastError('Community not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
