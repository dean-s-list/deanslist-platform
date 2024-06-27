import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiItem } from '@deanslist-platform/web-project-ui'
import { Group, Paper } from '@mantine/core'
import {
  UiAlert,
  UiContainer,
  UiDebugModal,
  UiError,
  UiGroup,
  UiLoader,
  UiStack,
  UiTabRoute,
  UiTabRoutes,
} from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { ManagerProjectDetailChannelsTab } from './manager-project-detail-channels-tab'
import { ManagerProjectDetailMembersTab } from './manager-project-detail-members-tab'
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
    { path: 'members', label: 'Members', element: <ManagerProjectDetailMembersTab projectId={projectId} /> },
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
    <UiContainer>
      <UiStack gap="xl">
        <Paper radius="lg" withBorder p="lg" bg="dark.7">
          <UiStack>
            <UiGroup>
              <Group>
                <ProjectUiItem project={item} />
              </Group>
              <Group gap="xs">
                <UiDebugModal data={item} />
              </Group>
            </UiGroup>
          </UiStack>
        </Paper>
        <Paper radius="lg" withBorder p="lg" bg="dark.7">
          <UiTabRoutes variant="pills" radius="xl" tabs={tabs} />
        </Paper>
      </UiStack>
    </UiContainer>
  )
}
