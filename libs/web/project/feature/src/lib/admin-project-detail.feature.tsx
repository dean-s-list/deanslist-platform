import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { useAdminFindOneProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiItem } from '@deanslist-platform/web-project-ui'
import { AdminReviewFeature } from '@deanslist-platform/web-review-feature'
import { UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { AdminProjectDetailChannelsTab } from './admin-project-detail-channels-tab'
import { AdminProjectDetailMembersTab } from './admin-project-detail-members-tab'
import { AdminProjectDetailSettingsTab } from './admin-project-detail-settings.tab'

export function AdminProjectDetailFeature() {
  const { projectId } = useParams<{ projectId: string }>() as { projectId: string }
  const { item, query } = useAdminFindOneProject({ projectId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Project not found." />
  }

  return (
    <UiPage
      leftAction={<CoreUiBack />}
      rightAction={<UiDebugModal data={item} />}
      title={<ProjectUiItem project={item} />}
    >
      <UiTabRoutes
        tabs={[
          { path: 'reviews', label: 'Reviews', element: <AdminReviewFeature projectId={projectId} /> },
          { path: 'members', label: 'Members', element: <AdminProjectDetailMembersTab projectId={projectId} /> },
          { path: 'channels', label: 'Channels', element: <AdminProjectDetailChannelsTab projectId={projectId} /> },
          {
            path: 'settings',
            label: 'Settings',
            element: <AdminProjectDetailSettingsTab projectId={projectId} />,
          },
        ]}
      />
    </UiPage>
  )
}
