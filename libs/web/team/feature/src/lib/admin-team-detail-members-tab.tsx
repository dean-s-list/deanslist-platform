import {
  useAdminAddTeamMember,
  useAdminGetTeamMembers,
  useAdminRemoveTeamMember,
  useAdminToggleTeamAdmin,
} from '@deanslist-platform/web-team-data-access'
import { TeamUiMembersPage } from '@deanslist-platform/web-team-ui'

export function AdminTeamDetailMembersTab({ teamId }: { teamId: string }) {
  const { items, query } = useAdminGetTeamMembers({ teamId })
  const { mutation: addTeamMember } = useAdminAddTeamMember({ teamId })

  const { mutation: removeTeamMember } = useAdminRemoveTeamMember({ teamId })
  const { mutation: toggleTeamAdmin } = useAdminToggleTeamAdmin({ teamId })

  function refresh() {
    query.refetch()
  }

  return (
    <TeamUiMembersPage
      items={items}
      isLoading={query.isLoading}
      remove={(userId) => removeTeamMember.mutateAsync(userId).then(refresh)}
      toggle={(userId) => toggleTeamAdmin.mutateAsync(userId).then(refresh)}
      add={(userId) => addTeamMember.mutateAsync(userId).then(refresh)}
    />
  )
}
