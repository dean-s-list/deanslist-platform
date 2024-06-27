import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useMutation } from '@tanstack/react-query'

export function useAdminDeleteProjectChannel({ channelId, projectId }: { channelId: string; projectId: string }) {
  const sdk = useSdk()

  const mutation = useMutation({
    mutationKey: ['adminDeleteProjectChannel', { projectId }],
    mutationFn: () =>
      sdk
        .adminDeleteProjectChannel({ projectId, channelId })
        .then((res) => res.data)
        .then((res) => {
          if (res.deleted) {
            toastSuccess('Project channel deleted')
          } else {
            toastError('Project channel not deleted')
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

export function useAdminDeleteCommunityChannel({ channelId, communityId }: { channelId: string; communityId: string }) {
  const sdk = useSdk()

  const mutation = useMutation({
    mutationKey: ['adminDeleteCommunityChannel', { communityId }],
    mutationFn: () =>
      sdk
        .adminDeleteCommunityChannel({ communityId, channelId })
        .then((res) => res.data)
        .then((res) => {
          if (res.deleted) {
            toastSuccess('Community channel deleted')
          } else {
            toastError('Community channel not deleted')
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
