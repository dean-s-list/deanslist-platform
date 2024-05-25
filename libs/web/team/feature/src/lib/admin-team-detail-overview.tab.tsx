import { useAdminFindOneTeam } from '@deanslist-platform/web-team-data-access'
import { UiCard, UiDebug, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminTeamDetailOverviewTab({ teamId }: { teamId: string }) {
  const { item, query } = useAdminFindOneTeam({ teamId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Team not found." />
  }

  return (
    <UiCard>
      <UiDebug data={item} open />
    </UiCard>
  )
}
