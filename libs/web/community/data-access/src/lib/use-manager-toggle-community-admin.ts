import { sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useManagerToggleCommunityAdmin({ communityId }: { communityId: string }) {
  const mutation = useMutation({
    mutationKey: ['manager', 'managerToggleCommunityAdmin', { communityId }],
    mutationFn: (userId: string) =>
      sdk
        .managerToggleCommunityAdmin({ communityId, userId })
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
