import { useAdminFindOneTeam } from '@deanslist-platform/web-team-data-access'
import { AdminTeamUiUpdateForm } from '@deanslist-platform/web-team-ui'
import { UiCard, UiError, UiLoader, UiTabRoutes } from '@pubkey-ui/core'
import { AdminTeamDetailChannelsTab } from './admin-team-detail-channels-tab'
import { AdminTeamDetailMembersTab } from './admin-team-detail-members-tab'

export function AdminTeamDetailSettingsTab({ teamId }: { teamId: string }) {
  const { item, query, updateTeam } = useAdminFindOneTeam({ teamId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }

  return (
    <UiTabRoutes
      tabs={[
        {
          path: 'members',
          label: 'Members',
          element: (
            <UiCard>
              <AdminTeamDetailMembersTab teamId={item.id} />
            </UiCard>
          ),
        },
        {
          path: 'channels',
          label: 'Channels',
          element: (
            <UiCard>
              <AdminTeamDetailChannelsTab teamId={item.id} />
            </UiCard>
          ),
        },
        {
          path: 'settings',
          label: 'Team Settings',
          element: (
            <UiCard>
              <AdminTeamUiUpdateForm team={item} submit={updateTeam} />
            </UiCard>
          ),
        },
      ]}
    />
  )
}
