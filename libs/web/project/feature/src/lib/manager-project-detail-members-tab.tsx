import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiMemberManager } from '@deanslist-platform/web-project-ui'
import { UiCard, UiError, UiLoader, UiStack } from '@pubkey-ui/core'

export function ManagerProjectDetailMembersTab({ projectId }: { projectId: string }) {
  const {
    item,
    query,
    addProjectManager,
    addProjectMember,
    addProjectReferral,
    removeProjectManager,
    removeProjectMember,
    removeProjectReferral,
  } = useManagerFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <UiStack>
      <UiCard title="Managers">
        <ProjectUiMemberManager
          users={item.managers ?? []}
          addUser={addProjectManager}
          removeUser={removeProjectManager}
        />
      </UiCard>
      <UiCard title="Members">
        <ProjectUiMemberManager
          users={item.members ?? []}
          addUser={addProjectMember}
          removeUser={removeProjectMember}
        />
      </UiCard>
      <UiCard title="Referral">
        <ProjectUiMemberManager
          users={item.referral ? [item.referral] : []}
          addUser={addProjectReferral}
          removeUser={removeProjectReferral}
        />
      </UiCard>
    </UiStack>
  )
}
