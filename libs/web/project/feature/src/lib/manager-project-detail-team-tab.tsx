import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiMemberManager } from '@deanslist-platform/web-project-ui'
import { Box, Text } from '@mantine/core'
import { UiError, UiLoader, UiStack } from '@pubkey-ui/core'

export function ManagerProjectDetailTeamTab({ projectId }: { projectId: string }) {
  const {
    item,
    query,
    addProjectManager,
    addProjectReferral,
    addProjectReviewer,
    removeProjectManager,
    removeProjectReferral,
    removeProjectReviewer,
  } = useManagerFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <UiStack gap="xl">
      <Box>
        <Text size="lg">Managers</Text>
        <ProjectUiMemberManager
          users={item.managers ?? []}
          addUser={addProjectManager}
          removeUser={removeProjectManager}
        />
      </Box>
      <Box>
        <Text size="lg">Referral</Text>
        <ProjectUiMemberManager
          users={item.referral ? [item.referral] : []}
          addUser={addProjectReferral}
          removeUser={removeProjectReferral}
        />
      </Box>
      <Box>
        <Text size="lg">Reviewers</Text>
        <ProjectUiMemberManager
          users={item.reviewers ?? []}
          addUser={addProjectReviewer}
          removeUser={removeProjectReviewer}
        />
      </Box>
    </UiStack>
  )
}
