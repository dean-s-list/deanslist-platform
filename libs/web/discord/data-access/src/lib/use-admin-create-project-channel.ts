import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminCreateProjectChannel({ projectId }: { projectId: string }) {
  const sdk = useSdk()

  const mutation = useMutation({
    mutationKey: ['adminCreateProjectChannel', { projectId }],
    mutationFn: ({ channelId, serverId }: { channelId: string; serverId: string }) =>
      sdk
        .adminCreateProjectChannel({ projectId, channelId, serverId })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess('Project channel created')
          } else {
            toastError('Project channel not created')
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

export function useAdminCreateTeamChannel({ teamId }: { teamId: string }) {
  const sdk = useSdk()

  const mutation = useMutation({
    mutationKey: ['adminCreateTeamChannel', { teamId }],
    mutationFn: ({ channelId, serverId }: { channelId: string; serverId: string }) =>
      sdk
        .adminCreateTeamChannel({ teamId, channelId, serverId })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess('Team channel created')
          } else {
            toastError('Team channel not created')
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
