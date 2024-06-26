import { useUserGetDiscordServers } from '@deanslist-platform/web-discord-data-access'
import { useUserFindOneTeam } from '@deanslist-platform/web-team-data-access'
import { UserTeamUiUpdateForm } from '@deanslist-platform/web-team-ui'
import { UiError, UiLoader } from '@pubkey-ui/core'

export function ManagerTeamSettingsGeneralTab({ teamId }: { teamId: string }) {
  const { item, query, updateTeam } = useUserFindOneTeam({ teamId })
  const { items: servers } = useUserGetDiscordServers()
  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }

  return <UserTeamUiUpdateForm team={item} servers={servers} submit={updateTeam} />
}
