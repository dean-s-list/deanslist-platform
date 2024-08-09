import { sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminCreateProjectChannel({ projectId }: { projectId: string }) {
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

export function useAdminCreateCommunityChannel({ communityId }: { communityId: string }) {
  const mutation = useMutation({
    mutationKey: ['adminCreateCommunityChannel', { communityId }],
    mutationFn: ({ channelId, serverId }: { channelId: string; serverId: string }) =>
      sdk
        .adminCreateCommunityChannel({ communityId, channelId, serverId })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess('Community channel created')
          } else {
            toastError('Community channel not created')
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
