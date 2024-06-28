import { AdminUpdateProjectInput, ManagerUpdateProjectInput, Project } from '@deanslist-platform/sdk'
import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiMemberManager, ProjectUiToggleReviewsOpen } from '@deanslist-platform/web-project-ui'
import { Box, SimpleGrid, Text } from '@mantine/core'
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
    updateProject,
  } = useManagerFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <ProjectUiTeamManager
      project={item}
      addProjectManager={addProjectManager}
      addProjectReferral={addProjectReferral}
      addProjectReviewer={addProjectReviewer}
      removeProjectManager={removeProjectManager}
      removeProjectReferral={removeProjectReferral}
      removeProjectReviewer={removeProjectReviewer}
      updateProject={(input) => updateProject(input, false)}
    />
  )
}

export function ProjectUiTeamManager({
  project,
  addProjectManager,
  addProjectReferral,
  addProjectReviewer,
  removeProjectManager,
  removeProjectReferral,
  removeProjectReviewer,
  updateProject,
}: {
  project: Project
  addProjectManager: (managerUserId: string) => Promise<boolean | null | undefined>
  addProjectReferral: (referralUserId: string) => Promise<boolean | null | undefined>
  addProjectReviewer: (reviewerUserId: string) => Promise<boolean | null | undefined>
  removeProjectManager: (managerUserId: string) => Promise<boolean | null | undefined>
  removeProjectReferral: (referralUserId: string) => Promise<boolean | null | undefined>
  removeProjectReviewer: (reviewerUserId: string) => Promise<boolean | null | undefined>
  updateProject: (input: AdminUpdateProjectInput | ManagerUpdateProjectInput) => Promise<boolean>
}) {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <UiStack gap="xl">
        <Box>
          <Text size="lg">Managers</Text>
          <ProjectUiMemberManager
            users={project.managers ?? []}
            addUser={addProjectManager}
            removeUser={removeProjectManager}
          />
        </Box>
        <Box>
          <Text size="lg">Referral</Text>
          <ProjectUiMemberManager
            users={project.referral ? [project.referral] : []}
            addUser={addProjectReferral}
            removeUser={removeProjectReferral}
          />
        </Box>
      </UiStack>
      <UiStack gap="xl">
        <ProjectUiToggleReviewsOpen project={project} update={(input) => updateProject(input)} />
        {!project.reviewsOpen || project.reviewers?.length ? (
          <Box>
            <Text size="lg">Reviewers</Text>
            <ProjectUiMemberManager
              users={project.reviewers ?? []}
              addUser={addProjectReviewer}
              removeUser={removeProjectReviewer}
            />
          </Box>
        ) : null}
      </UiStack>
    </SimpleGrid>
  )
}
