import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminToggleTeamAdmin({ teamId }: { teamId: string }) {
  const sdk = useSdk()

  const mutation = useMutation({
    mutationKey: ['admin', 'adminToggleTeamAdmin', { teamId }],
    mutationFn: (userId: string) =>
      sdk
        .adminToggleTeamAdmin({ teamId, userId })
        .then((res) => res.data)
        .then((res) => {
          if (res.toggled) {
            toastSuccess('User admin toggled successfully')
          } else {
            toastError('User admin not toggled')
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
