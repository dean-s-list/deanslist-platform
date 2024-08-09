import { sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminLeaveDiscordServer({ serverId }: { serverId: string }) {
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
