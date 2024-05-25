import {
  useUserAddTeamMember,
  useUserGetTeamMembers,
  useUserRemoveTeamMember,
  useUserToggleTeamAdmin,
} from '@deanslist-platform/web-team-data-access'
import { TeamUiMembersPage } from '@deanslist-platform/web-team-ui'

export function UserTeamDetailMembersTab({ teamId }: { teamId: string }) {
  const { items, query } = useUserGetTeamMembers({ teamId })
  const { mutation: addTeamMember } = useUserAddTeamMember({ teamId })

  const { mutation: removeTeamMember } = useUserRemoveTeamMember({ teamId })
  const { mutation: toggleTeamAdmin } = useUserToggleTeamAdmin({ teamId })

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
