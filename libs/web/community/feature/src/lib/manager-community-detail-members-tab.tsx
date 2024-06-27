import {
  useManagerAddCommunityMember,
  useManagerGetCommunityMembers,
  useManagerRemoveCommunityMember,
  useManagerToggleCommunityAdmin,
} from '@deanslist-platform/web-community-data-access'
import { CommunityUiSettingsMembers } from '@deanslist-platform/web-community-ui'

export function ManagerCommunityDetailMembersTab({ communityId }: { communityId: string }) {
  const { items, query } = useManagerGetCommunityMembers({ communityId })
  const { mutation: addCommunityMember } = useManagerAddCommunityMember({ communityId })

  const { mutation: removeCommunityMember } = useManagerRemoveCommunityMember({ communityId })
  const { mutation: toggleCommunityAdmin } = useManagerToggleCommunityAdmin({ communityId })

  function refresh() {
    query.refetch()
  }

  return (
    <CommunityUiSettingsMembers
      items={items}
      isLoading={query.isLoading}
      remove={(userId) => removeCommunityMember.mutateAsync(userId).then(refresh)}
      toggle={(userId) => toggleCommunityAdmin.mutateAsync(userId).then(refresh)}
      add={(userId) => addCommunityMember.mutateAsync(userId).then(refresh)}
    />
  )
}
