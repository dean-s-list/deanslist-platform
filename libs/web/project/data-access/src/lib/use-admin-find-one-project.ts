import { AdminUpdateProjectInput, Project, ProjectRole, sdk } from '@deanslist-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useAdminFindOneProject({ projectId }: { projectId: string }) {
  const client = useQueryClient()
  const queryKey = ['admin', 'find-one-project', projectId]
  const query = useQuery({
    queryKey,
    queryFn: () => sdk.adminFindOneProject({ projectId }).then((res) => res.data),
    retry: 0,
  })
  const item: Project | undefined = query.data?.item ?? undefined

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
    removeProjectMember: async (projectMemberId: string) =>
      sdk
        .adminRemoveProjectMember({ projectMemberId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.removed) {
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
    updateProject: async (input: AdminUpdateProjectInput, toast = true) =>
      sdk
        .adminUpdateProject({ projectId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.updated) {
            if (toast) {
              toastSuccess('Project updated 1')
            }
            return res.updated
          }
          toastError('Project not updated')
          await query.refetch()
          await client.invalidateQueries({ queryKey })
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
    updateProjectMemberRole: async (projectMemberId: string, role: ProjectRole) =>
      sdk
        .adminUpdateProjectMemberRole({ projectMemberId, role })
        .then((res) => res.data)
        .then(async (res) => {
          if (res.updated) {
            toastSuccess('Project role updated')
            await query.refetch()
            return res.updated
          }
          toastError('Project role not updated')
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
  }
}
