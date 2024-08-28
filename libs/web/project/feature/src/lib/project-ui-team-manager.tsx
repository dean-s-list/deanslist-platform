import { AdminUpdateProjectInput, ManagerUpdateProjectInput, Project } from '@deanslist-platform/sdk'
import { ProjectUiMemberManager, ProjectUiToggleReviewsOpen } from '@deanslist-platform/web-project-ui'
import { SimpleGrid, Text } from '@mantine/core'
import { UiInfo, UiStack } from '@pubkey-ui/core'

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
  updateProject: (input: AdminUpdateProjectInput | ManagerUpdateProjectInput) => Promise<Project | null>
}) {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <UiStack gap="xl">
        <UiStack>
          <Text size="xl" fw={700}>
            Managers
          </Text>
          <UiInfo
            message="The managers are in charge of rating feedback, calculating payouts and delivering the end report to the client."
            variant="outline"
          />
          <ProjectUiMemberManager
            placeholder="Add a manager"
            members={project.managers ?? []}
            addUser={addProjectManager}
            removeUser={removeProjectManager}
          />
        </UiStack>
        <UiStack>
          <Text size="xl" fw={700}>
            Referral
          </Text>
          <UiInfo
            message="The user who made the sale for the given project and brought work to the community."
            variant="outline"
          />
          <ProjectUiMemberManager
            placeholder="Add a referral"
            max={1}
            members={project.referral ? [project.referral] : []}
            addUser={addProjectReferral}
            removeUser={removeProjectReferral}
          />
        </UiStack>
        <UiStack>
          <Text size="xl" fw={700}>
            Reviewers
          </Text>
          <UiStack px="xs">
            <ProjectUiToggleReviewsOpen project={project} update={updateProject} />
          </UiStack>
        </UiStack>
        {!project.reviewsOpen || project.reviewers?.length ? (
          <ProjectUiMemberManager
            placeholder="Add a reviewer"
            members={project.reviewers ?? []}
            addUser={addProjectReviewer}
            removeUser={removeProjectReviewer}
          />
        ) : null}
      </UiStack>
    </SimpleGrid>
  )
}
