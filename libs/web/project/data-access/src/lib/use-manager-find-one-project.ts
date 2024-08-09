import { ManagerUpdateProjectInput, ProjectStatus, sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useManagerFindOneProject({ projectId }: { projectId: string }) {
  const client = useQueryClient()

  const queryKey = ['manager', 'find-one-project', projectId]

  const query = useQuery({
    queryKey,
    queryFn: () => sdk.managerFindOneProject({ projectId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    invalidate: () => client.invalidateQueries({ queryKey }),
    addProjectManager: (managerUserId: string) =>
      sdk
        .managerAddProjectManager({ projectId, managerUserId })
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
    splitByRating: () =>
      sdk
        .managerSplitByRating({ projectId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project split')
            await query.refetch()
            return !!res.split
          }
          toastError('Project not split')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    removeProjectManager: (managerUserId: string) =>
      sdk
        .managerRemoveProjectManager({ projectId, managerUserId })
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
    addProjectReviewer: (reviewerUserId: string) =>
      sdk
        .managerAddProjectReviewer({ projectId, reviewerUserId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project reviewer added')
            await query.refetch()
            return res.added
          }
          toastError('Project reviewer not added')
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
    removeProjectReviewer: (reviewerUserId: string) =>
      sdk
        .managerRemoveProjectReviewer({ projectId, reviewerUserId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project reviewer removed')
            await query.refetch()
            return res.removed
          }
          toastError('Project reviewer not removed')
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
    addProjectReferral: (referralUserId: string) =>
      sdk
        .managerAddProjectReferral({ projectId, referralUserId })
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
        .managerRemoveProjectReferral({ projectId, referralUserId })
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
    updateProject: async (input: ManagerUpdateProjectInput, toast = true) =>
      sdk
        .managerUpdateProject({ projectId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.updated) {
            if (toast) {
              toastSuccess('Project updated')
            }
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
    updateProjectStatus: (status: ProjectStatus) =>
      sdk
        .managerUpdateProjectStatus({ projectId, status })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project status updated')
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
