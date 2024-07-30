import { AdminUpdateProjectInput, ManagerUpdateProjectInput, Project } from '@deanslist-platform/sdk'
import { ProjectUiMemberManager, ProjectUiToggleReviewsOpen } from '@deanslist-platform/web-project-ui'
import { SimpleGrid, Text } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'

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
        <UiStack>
          <Text size="xl" fw={700}>
            Managers
          </Text>
          <ProjectUiMemberManager
            placeholder="Add a manager"
            users={project.managers ?? []}
            addUser={addProjectManager}
            removeUser={removeProjectManager}
          />
        </UiStack>
        <UiStack>
          <Text size="xl" fw={700}>
            Referral
          </Text>
          <ProjectUiMemberManager
            placeholder="Add a referral"
            max={1}
            users={project.referral ? [project.referral] : []}
            addUser={addProjectReferral}
            removeUser={removeProjectReferral}
          />
        </UiStack>
        <UiStack>
          <Text size="xl" fw={700}>
            Reviewers
          </Text>
          <UiStack px="xs">
            <ProjectUiToggleReviewsOpen project={project} update={(input) => updateProject(input)} />
          </UiStack>
        </UiStack>
        {!project.reviewsOpen || project.reviewers?.length ? (
          <ProjectUiMemberManager
            placeholder="Add a reviewer"
            users={project.reviewers ?? []}
            addUser={addProjectReviewer}
            removeUser={removeProjectReviewer}
          />
        ) : null}
      </UiStack>
    </SimpleGrid>
  )
}
