import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useUserAddTeamMember({ teamId }: { teamId: string }) {
  const sdk = useSdk()

  const mutation = useMutation({
    mutationKey: ['user', 'userAddTeamMember', { teamId }],
    mutationFn: (userId: string) =>
      sdk
        .userAddTeamMember({ teamId, userId })
        .then((res) => res.data)
        .then((res) => {
          if (res.added) {
            toastSuccess('User added to team')
          } else {
            toastError('User not added to team')
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
