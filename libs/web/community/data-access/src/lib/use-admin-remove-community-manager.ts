import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminRemoveCommunityManager({ communityId }: { communityId: string }) {
  const sdk = useSdk()

  const mutation = useMutation({
    mutationKey: ['admin', 'adminRemoveCommunityManager', { communityId }],
    mutationFn: (userId: string) =>
      sdk
        .adminRemoveCommunityManager({ communityId, userId })
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
