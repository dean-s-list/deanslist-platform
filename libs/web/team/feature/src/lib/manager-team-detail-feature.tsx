import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiBack, CoreUiButton } from '@deanslist-platform/web-core-ui'
import { UserProjectTeamFeature } from '@deanslist-platform/web-project-feature'
import { useManagerFindOneTeam, useManagerGetTeamMember } from '@deanslist-platform/web-team-data-access'
import { TeamUiItem } from '@deanslist-platform/web-team-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { IconShield } from '@tabler/icons-react'
import { useParams } from 'react-router-dom'
import { ManagerTeamDetailMembersTab } from './manager-team-detail-members-tab'
import { ManagerTeamSettingsGeneralTab } from './manager-team-settings-general.tab'

export function ManagerTeamDetailFeature() {
  const { teamId } = useParams<{ teamId: string }>() as { teamId: string }
  const { item, query } = useManagerFindOneTeam({ teamId })
  const { isTeamAdmin } = useManagerGetTeamMember({ teamId })
  const { isAdmin } = useAuth()

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
        element: <ManagerTeamDetailMembersTab teamId={teamId} />,
      },
      {
        path: 'settings',
        label: 'Team Settings',
        element: <ManagerTeamSettingsGeneralTab teamId={teamId} />,
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
          {isAdmin ? (
            <CoreUiButton to={`/admin/teams/${teamId}`} iconLeft={IconShield}>
              Manage Team
            </CoreUiButton>
          ) : null}
        </Group>
      }
    >
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}
