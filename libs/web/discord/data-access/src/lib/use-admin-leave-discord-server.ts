import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminLeaveDiscordServer({ serverId }: { serverId: string }) {
  const sdk = useSdk()

  const mutation = useMutation({
    mutationKey: ['adminLeaveDiscordServer', { serverId }],
    mutationFn: () =>
      sdk
        .adminLeaveDiscordServer({ serverId })
        .then((res) => res.data)
        .then((res) => {
          if (res.left) {
            toastSuccess('Left server')
          } else {
            toastError('Failed to leave server')
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
