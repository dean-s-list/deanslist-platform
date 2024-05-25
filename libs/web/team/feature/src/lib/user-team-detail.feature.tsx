import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { UserProjectTeamFeature } from '@deanslist-platform/web-project-feature'
import { useUserFindOneTeam, useUserGetTeamMember } from '@deanslist-platform/web-team-data-access'
import { TeamUiItem } from '@deanslist-platform/web-team-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserTeamDetailChannelsTab } from './user-team-detail-channels-tab'
import { UserTeamDetailMembersTab } from './user-team-detail-members-tab'
import { UserTeamSettingsGeneralTab } from './user-team-settings-general.tab'

export function UserTeamDetailFeature() {
  const { teamId } = useParams<{ teamId: string }>() as { teamId: string }
  const { item, query } = useUserFindOneTeam({ teamId })
  const { isTeamAdmin } = useUserGetTeamMember({ teamId })

  const tabs: UiTabRoute[] = [
    {
      path: 'projects',
      label: 'Projects',
      element: <UserProjectTeamFeature teamId={teamId} />,
    },
  ]

  if (isTeamAdmin) {
    tabs.push(
      {
        path: 'members',
        label: 'Members',
        element: <UserTeamDetailMembersTab teamId={teamId} />,
      },
      {
        path: 'channels',
        label: 'Channels',
        element: <UserTeamDetailChannelsTab teamId={teamId} />,
      },
      {
        path: 'settings',
        label: 'Team Settings',
        element: <UserTeamSettingsGeneralTab teamId={teamId} />,
      },
    )
  }

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }
  return (
    <UiPage
      title={<TeamUiItem team={item} />}
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}
