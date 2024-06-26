import {
  useManagerAddTeamMember,
  useManagerGetTeamMembers,
  useManagerRemoveTeamMember,
  useManagerToggleTeamAdmin,
} from '@deanslist-platform/web-team-data-access'
import { TeamUiSettingsMembers } from '@deanslist-platform/web-team-ui'

export function ManagerTeamDetailMembersTab({ teamId }: { teamId: string }) {
  const { items, query } = useManagerGetTeamMembers({ teamId })
  const { mutation: addTeamMember } = useManagerAddTeamMember({ teamId })

  const { mutation: removeTeamMember } = useManagerRemoveTeamMember({ teamId })
  const { mutation: toggleTeamAdmin } = useManagerToggleTeamAdmin({ teamId })

  function refresh() {
    query.refetch()
  }

  return (
    <TeamUiSettingsMembers
      items={items}
      isLoading={query.isLoading}
      remove={(userId) => removeTeamMember.mutateAsync(userId).then(refresh)}
      toggle={(userId) => toggleTeamAdmin.mutateAsync(userId).then(refresh)}
      add={(userId) => addTeamMember.mutateAsync(userId).then(refresh)}
    />
  )
}
