import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useManagerAddCommunityMember({ communityId }: { communityId: string }) {
  const sdk = useSdk()

  const mutation = useMutation({
    mutationKey: ['manager', 'managerAddCommunityMember', { communityId }],
    mutationFn: (userId: string) =>
      sdk
        .managerAddCommunityMember({ communityId, userId })
        .then((res) => res.data)
        .then((res) => {
          if (res.added) {
            toastSuccess('Member added to community')
          } else {
            toastError('Member not added to community')
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
