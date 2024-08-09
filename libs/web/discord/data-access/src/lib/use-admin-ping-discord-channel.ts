import { sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminPingDiscordChannel({ serverId, channelId }: { serverId: string; channelId: string }) {
  const mutation = useMutation({
    mutationKey: ['adminPingDiscordChannel', { serverId, channelId }],
    mutationFn: () =>
      sdk
        .adminPingDiscordChannel({ serverId, channelId })
        .then((res) => res.data)
        .then((res) => {
          if (res.pong) {
            toastSuccess('Pong!')
          } else {
            toastError('No pong')
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
