import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminPingDiscordChannel({ serverId, channelId }: { serverId: string; channelId: string }) {
  const sdk = useSdk()

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
