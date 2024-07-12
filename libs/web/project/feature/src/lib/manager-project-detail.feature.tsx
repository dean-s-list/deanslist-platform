import { CoreUiCard, CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiItem } from '@deanslist-platform/web-project-ui'
import { Group } from '@mantine/core'
import { UiError, UiLoader, UiStack, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { ManagerProjectDetailChannelsTab } from './manager-project-detail-channels-tab'
import { ManagerProjectDetailPayoutsTab, ManagerProjectDetailRatingsTab } from './manager-project-detail-payouts-tab'
import { ManagerProjectDetailSettingsTab } from './manager-project-detail-settings-tab'
import { ManagerProjectDetailTeamTab } from './manager-project-detail-team-tab'

export function ManagerProjectDetailFeature() {
  const { projectId } = useParams<{ projectId: string }>() as { projectId: string }
  const { item, query } = useManagerFindOneProject({ projectId })

  const tabs: UiTabRoute[] = [
    {
      path: 'settings',
      label: 'Settings',
      element: <ManagerProjectDetailSettingsTab projectId={projectId} />,
    },
    { path: 'team', label: 'Team', element: <ManagerProjectDetailTeamTab projectId={projectId} /> },
    { path: 'rating', label: 'Rating', element: <ManagerProjectDetailRatingsTab projectId={projectId} /> },
    { path: 'payouts', label: 'Payouts', element: <ManagerProjectDetailPayoutsTab projectId={projectId} /> },
    { path: 'channels', label: '', element: <ManagerProjectDetailChannelsTab projectId={projectId} /> },
  ]

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <UiStack gap="xl" mt="sm">
      <Group>
        <ProjectUiItem project={item} />
        <CoreUiDebugModal data={item} />
      </Group>
      <CoreUiCard>
        <UiTabRoutes variant="pills" radius="xl" tabs={tabs} />
      </CoreUiCard>
    </UiStack>
  )
}
