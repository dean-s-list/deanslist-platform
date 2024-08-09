import { sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useManagerAddCommunityManager({ communityId }: { communityId: string }) {
  const mutation = useMutation({
    mutationKey: ['manager', 'managerAddCommunityManager', { communityId }],
    mutationFn: (userId: string) =>
      sdk
        .managerAddCommunityManager({ communityId, userId })
        .then((res) => res.data)
        .then((res) => {
          if (res.added) {
            toastSuccess('Manager added to community')
          } else {
            toastError('Manager not added to community')
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
