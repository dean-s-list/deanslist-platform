import { CoreUiBackLink, CoreUiCard, CoreUiDebugModal, dividerColor } from '@deanslist-platform/web-core-ui'
import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiItem } from '@deanslist-platform/web-project-ui'
import { UiContainer, UiError, UiGroup, UiLoader, UiStack, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { ManagerProjectDetailPayoutsTab } from './manager-project-detail-payouts-tab'
import { ManagerProjectDetailRatingsTab } from './manager-project-detail-ratings-tab'
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
    // { path: 'channels', label: '', element: <ManagerProjectDetailChannelsTab projectId={projectId} /> },
  ]

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <UiContainer>
      <CoreUiBackLink label="Back to overview" />
      <CoreUiCard>
        <UiStack>
          <UiGroup>
            <ProjectUiItem project={item} />
            <CoreUiDebugModal data={item} />
          </UiGroup>
          <UiTabRoutes
            styles={{
              root: { background: dividerColor, borderRadius: 48, padding: 8 },
            }}
            variant="pills"
            radius="xl"
            tabs={tabs}
          />
        </UiStack>
      </CoreUiCard>
    </UiContainer>
  )
}
