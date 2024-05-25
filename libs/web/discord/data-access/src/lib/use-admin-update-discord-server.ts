import { AdminUpdateDiscordServerInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminUpdateDiscordServer({ serverId }: { serverId: string }) {
  const sdk = useSdk()

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
