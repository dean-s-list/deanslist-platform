import { CoreUiCard } from '@deanslist-platform/web-core-ui'
import { useAdminFindOneProject } from '@deanslist-platform/web-project-data-access'
import { AdminProjectMemberUiTable, ProjectUiAddMember } from '@deanslist-platform/web-project-ui'
import { UiError, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminProjectDetailTeamTab({ projectId }: { projectId: string }) {
  const { item, query, addProjectManager, removeProjectMember, updateProjectMemberRole } = useAdminFindOneProject({
    projectId,
  })

  if (query.isLoading || query.isFetching) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }
  const members = item.members ?? []

  return (
    <CoreUiCard>
      <UiStack>
        <ProjectUiAddMember members={members} addUser={addProjectManager} />
        <AdminProjectMemberUiTable
          projectMembers={members}
          updateProjectMemberRole={updateProjectMemberRole}
          removeProjectMember={removeProjectMember}
        />
      </UiStack>
    </CoreUiCard>
  )
}
