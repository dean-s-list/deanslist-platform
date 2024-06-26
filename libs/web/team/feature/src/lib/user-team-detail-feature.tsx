import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiBack, CoreUiButton } from '@deanslist-platform/web-core-ui'
import { useUserFindOneTeam } from '@deanslist-platform/web-team-data-access'
import { TeamUiItem } from '@deanslist-platform/web-team-ui'
import { Group } from '@mantine/core'
import { UiDebug, UiDebugModal, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconShield } from '@tabler/icons-react'
import { useParams } from 'react-router-dom'

export function UserTeamDetailFeature() {
  const { teamId } = useParams<{ teamId: string }>() as { teamId: string }
  const { item, query } = useUserFindOneTeam({ teamId })
  const { isAdmin } = useAuth()

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
      <UiDebug data={item} open hideButton />
    </UiPage>
  )
}
