import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useManagerRemoveCommunityMember({ communityId }: { communityId: string }) {
  const sdk = useSdk()

  const mutation = useMutation({
    mutationKey: ['manager', 'managerRemoveCommunityMember', { communityId }],
    mutationFn: (userId: string) =>
      sdk
        .managerRemoveCommunityMember({ communityId, userId })
        .then((res) => res.data)
        .then((res) => {
          if (res.removed) {
            toastSuccess('Member removed from community')
          } else {
            toastError('Member not removed from community')
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
