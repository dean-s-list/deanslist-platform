import { CoreUiBackLink, CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiItem } from '@deanslist-platform/web-project-ui'
import { Box, Group, Paper } from '@mantine/core'
import { UiAlert, UiError, UiGroup, UiLoader, UiStack, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { ManagerProjectDetailChannelsTab } from './manager-project-detail-channels-tab'
import { ManagerProjectDetailTeamTab } from './manager-project-detail-team-tab'
import { ManagerProjectSettingsTab } from './manager-project-settings-tab'

export function ManagerProjectDetailFeature() {
  const { projectId } = useParams<{ projectId: string }>() as { projectId: string }
  const { item, query } = useManagerFindOneProject({ projectId })

  const tabs: UiTabRoute[] = [
    {
      path: 'settings',
      label: 'Settings',
      element: <ManagerProjectSettingsTab projectId={projectId} />,
    },
    { path: 'team', label: 'Team', element: <ManagerProjectDetailTeamTab projectId={projectId} /> },
    { path: 'rating', label: 'Rating', element: <UiAlert message="Coming soon." /> },
    { path: 'payout', label: 'Payout', element: <UiAlert message="Coming soon." /> },
    { path: 'channels', label: '', element: <ManagerProjectDetailChannelsTab projectId={projectId} /> },
  ]

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <Box>
      <CoreUiBackLink label="Back to projects" />
      <UiStack gap="xl" mt="sm">
        <Paper radius="lg" withBorder p="lg" bg="dark.7">
          <UiStack>
            <UiGroup>
              <Group>
                <ProjectUiItem project={item} />
              </Group>
              <Group gap="xs">
                <CoreUiDebugModal data={item} />
              </Group>
            </UiGroup>
          </UiStack>
        </Paper>
        <Paper radius="lg" withBorder p="lg" bg="dark.7">
          <UiTabRoutes variant="pills" radius="xl" tabs={tabs} />
        </Paper>
      </UiStack>
    </Box>
  )
}
