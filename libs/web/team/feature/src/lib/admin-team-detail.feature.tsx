import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { useAdminFindOneTeam } from '@deanslist-platform/web-team-data-access'
import { AdminTeamUiUpdateForm, TeamUiItem } from '@deanslist-platform/web-team-ui'
import { Group } from '@mantine/core'
import { UiCard, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoutes } from '@pubkey-ui/core'
import { useLocation, useParams } from 'react-router-dom'
import { AdminTeamDetailChannelsTab } from './admin-team-detail-channels-tab'
import { AdminTeamDetailMembersTab } from './admin-team-detail-members-tab'

export function AdminTeamDetailFeature() {
  const { pathname } = useLocation()
  const { teamId } = useParams<{ teamId: string }>() as { teamId: string }
  const { item, query, updateTeam } = useAdminFindOneTeam({ teamId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }

  const baseUrl = `/admin/teams/${teamId}`
  return (
    <UiPage
      title={<TeamUiItem team={item} to={baseUrl} />}
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          {
            path: 'members',
            label: 'Members',
            element: <AdminTeamDetailMembersTab teamId={item.id} />,
          },
          {
            path: 'channels',
            label: 'Channels',
            element: <AdminTeamDetailChannelsTab teamId={item.id} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: (
              <UiCard>
                <AdminTeamUiUpdateForm team={item} submit={updateTeam} />
              </UiCard>
            ),
          },
        ]}
      />
    </UiPage>
  )
}
