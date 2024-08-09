import { sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useManagerRemoveCommunityManager({ communityId }: { communityId: string }) {
  const mutation = useMutation({
    mutationKey: ['manager', 'managerRemoveCommunityManager', { communityId }],
    mutationFn: (userId: string) =>
      sdk
        .managerRemoveCommunityManager({ communityId, userId })
        .then((res) => res.data)
        .then((res) => {
          if (res.removed) {
            toastSuccess('Manager removed from community')
          } else {
            toastError('Manager not removed from community')
          }
        })
        .catch((err) => {
          toastError(err.message)
        }),
  })

  return {
    mutation,
  }
}
