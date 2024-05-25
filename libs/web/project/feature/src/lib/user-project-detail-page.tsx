import { Project } from '@deanslist-platform/sdk'
import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { ProjectUiItem } from '@deanslist-platform/web-project-ui'
import { UserReviewFeature } from '@deanslist-platform/web-review-feature'
import { useUserGetTeamMember } from '@deanslist-platform/web-team-data-access'
import { Group } from '@mantine/core'
import { UiContainer, UiDebugModal, UiGroup, UiStack, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { UserProjectDetailChannelsTab } from './user-project-detail-channels-tab'
import { UserProjectDetailDashboard } from './user-project-detail-dashboard'
import { UserProjectSettingsTab } from './user-project-settings-tab'

export function UserProjectDetailPage({ project }: { project: Project }) {
  const { isTeamAdmin } = useUserGetTeamMember({ teamId: project.teamId })

  const tabs: UiTabRoute[] = [
    {
      path: 'dashboard',
      label: 'Dashboard',
      element: <UserProjectDetailDashboard projectId={project.id} />,
    },
    { path: 'reviews', label: 'Reviews', element: <UserReviewFeature projectId={project.id} /> },
  ]
  if (isTeamAdmin) {
    tabs.push(
      { path: 'channels', label: 'Channels', element: <UserProjectDetailChannelsTab projectId={project.id} /> },
      {
        path: 'settings',
        label: 'Settings',
        element: (
          <UiContainer>
            <UserProjectSettingsTab projectId={project.id} />
          </UiContainer>
        ),
      },
    )
  }

  return (
    <UiContainer>
      <UiStack>
        <UiGroup>
          <Group>
            <CoreUiBack />
            <ProjectUiItem project={project} />
          </Group>
          <Group gap="xs">
            <UiDebugModal data={project} />
          </Group>
        </UiGroup>
        <UiTabRoutes tabs={tabs} />
      </UiStack>
    </UiContainer>
  )
}
