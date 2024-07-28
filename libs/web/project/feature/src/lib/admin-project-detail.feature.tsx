import { CoreUiBack, CoreUiButton, CoreUiDebugModal, CoreUiPage } from '@deanslist-platform/web-core-ui'
import { useAdminFindOneProject } from '@deanslist-platform/web-project-data-access'
import { AdminProjectUiStatusSelect, ProjectUiItem } from '@deanslist-platform/web-project-ui'
import { AdminReviewFeature } from '@deanslist-platform/web-review-feature'
import { Group } from '@mantine/core'
import { UiError, UiLoader, UiTabRoutes } from '@pubkey-ui/core'
import { IconChairDirector } from '@tabler/icons-react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { AdminProjectDetailChannelsTab } from './admin-project-detail-channels-tab'
import { AdminProjectDetailSettingsTab } from './admin-project-detail-settings.tab'
import { AdminProjectDetailTeamTab } from './admin-project-detail-team-tab'

export function AdminProjectDetailFeature() {
  const { projectId } = useParams<{ projectId: string }>() as { projectId: string }
  const { item, query, updateProject } = useAdminFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <CoreUiPage
      withContainer={false}
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <CoreUiDebugModal data={item} />
          <AdminProjectUiStatusSelect project={item} submit={(status) => updateProject({ status }).then(() => true)} />
          <CoreUiButton variant="light" to={item.manageUrl} iconLeft={IconChairDirector}>
            Manage project
          </CoreUiButton>
        </Group>
      }
      title={<ProjectUiItem project={item} />}
    >
      <UiTabRoutes
        tabs={[
          { path: 'reviews', label: 'Reviews', element: <AdminReviewFeature projectId={projectId} /> },
          { path: 'team', label: 'Team', element: <AdminProjectDetailTeamTab projectId={projectId} /> },
          { path: 'channels', label: 'Channels', element: <AdminProjectDetailChannelsTab projectId={projectId} /> },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminProjectDetailSettingsTab projectId={projectId} />,
          },
        ]}
      />
    </CoreUiPage>
  )
}
