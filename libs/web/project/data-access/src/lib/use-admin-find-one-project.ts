import { AdminUpdateProjectInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneProject({ projectId }: { projectId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-project', projectId],
    queryFn: () => sdk.adminFindOneProject({ projectId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    addProjectManager: (managerUserId: string) =>
      sdk
        .adminAddProjectManager({ projectId, managerUserId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project manager added')
            await query.refetch()
            return res.added
          }
          toastError('Project manager not added')
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
    removeProjectManager: (managerUserId: string) =>
      sdk
        .adminRemoveProjectManager({ projectId, managerUserId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project manager removed')
            await query.refetch()
            return res.removed
          }
          toastError('Project manager not removed')
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
    addProjectMember: (memberUserId: string) =>
      sdk
        .adminAddProjectMember({ projectId, memberUserId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project member added')
            await query.refetch()
            return res.added
          }
          toastError('Project member not added')
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
    removeProjectMember: (memberUserId: string) =>
      sdk
        .adminRemoveProjectMember({ projectId, memberUserId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project member removed')
            await query.refetch()
            return res.removed
          }
          toastError('Project member not removed')
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
    addProjectReferral: (referralUserId: string) =>
      sdk
        .adminAddProjectReferral({ projectId, referralUserId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project referral added')
            await query.refetch()
            return res.added
          }
          toastError('Project referral not added')
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
    removeProjectReferral: (referralUserId: string) =>
      sdk
        .adminRemoveProjectReferral({ projectId, referralUserId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project referral removed')
            await query.refetch()
            return res.removed
          }
          toastError('Project referral not removed')
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
    updateProject: async (input: AdminUpdateProjectInput) =>
      sdk
        .adminUpdateProject({ projectId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project updated')
            await query.refetch()
            return res.updated
          }
          toastError('Project not updated')
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
  }
}
