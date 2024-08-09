import { sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminToggleCommunityAdmin({ communityId }: { communityId: string }) {
  const mutation = useMutation({
    mutationKey: ['admin', 'adminToggleCommunityAdmin', { communityId }],
    mutationFn: (userId: string) =>
      sdk
        .adminToggleCommunityAdmin({ communityId, userId })
        .then((res) => res.data)
        .then((res) => {
          if (res.toggled) {
            toastSuccess('Manager admin toggled successfully')
          } else {
            toastError('Manager admin not toggled')
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
