import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useUserRemoveTeamMember({ teamId }: { teamId: string }) {
  const sdk = useSdk()

  const mutation = useMutation({
    mutationKey: ['user', 'userRemoveTeamMember', { teamId }],
    mutationFn: (userId: string) =>
      sdk
        .userRemoveTeamMember({ teamId, userId })
        .then((res) => res.data)
        .then((res) => {
          if (res.removed) {
            toastSuccess('User removed from team')
          } else {
            toastError('User not removed from team')
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
