import { AdminUpdateDiscordServerInput, sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminUpdateDiscordServer({ serverId }: { serverId: string }) {
  const mutation = useMutation({
    mutationKey: ['adminUpdateDiscordServer', { serverId }],
    mutationFn: (input: AdminUpdateDiscordServerInput) =>
      sdk
        .adminUpdateDiscordServer({ serverId, input })
        .then((res) => res.data)
        .then((res) => {
          if (res.updated) {
            toastSuccess('Discord server updated')
          } else {
            toastError('Discord server not updated')
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
