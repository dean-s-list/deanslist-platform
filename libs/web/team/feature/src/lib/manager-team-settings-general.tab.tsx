import { useManagerGetDiscordServers } from '@deanslist-platform/web-discord-data-access'
import { useManagerFindOneTeam } from '@deanslist-platform/web-team-data-access'
import { ManagerTeamUiUpdateForm } from '@deanslist-platform/web-team-ui'
import { UiError, UiLoader } from '@pubkey-ui/core'

export function ManagerTeamSettingsGeneralTab({ teamId }: { teamId: string }) {
  const { item, query, updateTeam } = useManagerFindOneTeam({ teamId })
  const { items: servers } = useManagerGetDiscordServers()
  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }

  return <ManagerTeamUiUpdateForm team={item} servers={servers} submit={updateTeam} />
}
