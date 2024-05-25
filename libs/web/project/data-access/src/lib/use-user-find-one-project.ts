import { UserUpdateProjectInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneProject({ projectId }: { projectId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-project', projectId],
    queryFn: () => sdk.userFindOneProject({ projectId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateProject: async (input: UserUpdateProjectInput) =>
      sdk
        .userUpdateProject({ projectId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project updated')
            await query.refetch()
            return true
          }
          toastError('Project not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
