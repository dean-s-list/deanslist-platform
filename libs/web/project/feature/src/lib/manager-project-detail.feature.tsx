import {
  CoreUiBackLink,
  CoreUiButton,
  CoreUiCard,
  CoreUiDebugModal,
  dividerColor,
} from '@deanslist-platform/web-core-ui'
import { useManagerFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiItem, ProjectUiStatusBadge, ProjectUiStatusSelect } from '@deanslist-platform/web-project-ui'
import { Group } from '@mantine/core'
import { UiContainer, UiError, UiGroup, UiLoader, UiStack, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { IconChairDirector } from '@tabler/icons-react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ManagerProjectDetailPayoutsTab } from './manager-project-detail-payouts-tab'
import { ManagerProjectDetailRatingsTab } from './manager-project-detail-ratings-tab'
import { ManagerProjectDetailSettingsTab } from './manager-project-detail-settings-tab'
import { ManagerProjectDetailTeamTab } from './manager-project-detail-team-tab'

export function ManagerProjectDetailFeature() {
  const { projectId } = useParams<{ projectId: string }>() as { projectId: string }
  const { item, query, updateProjectStatus } = useManagerFindOneProject({ projectId })

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
      <UiStack>
        <UiGroup>
          <Group>
            <CoreUiBackLink label="Back to overview" />
            <CoreUiDebugModal data={item} />
          </Group>
          <CoreUiButton variant="light" to={item.viewUrl} iconLeft={IconChairDirector}>
            View project
          </CoreUiButton>
        </UiGroup>

        <CoreUiCard>
          <UiStack>
            <UiGroup>
              <ProjectUiItem project={item}>
                <ProjectUiStatusBadge size="xs" status={item.status} />
              </ProjectUiItem>
              <Group>
                <CoreUiDebugModal data={item} />
                <ProjectUiStatusSelect project={item} submit={updateProjectStatus} />
              </Group>
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
      </UiStack>
    </UiContainer>
  )
}
