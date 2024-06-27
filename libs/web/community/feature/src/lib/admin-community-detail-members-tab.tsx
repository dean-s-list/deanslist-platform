import {
  useAdminAddCommunityMember,
  useAdminGetCommunityMembers,
  useAdminRemoveCommunityMember,
  useAdminToggleCommunityAdmin,
} from '@deanslist-platform/web-community-data-access'
import { CommunityUiSettingsMembers } from '@deanslist-platform/web-community-ui'

export function AdminCommunityDetailMembersTab({ communityId }: { communityId: string }) {
  const { items, query } = useAdminGetCommunityMembers({ communityId })
  const { mutation: addCommunityMember } = useAdminAddCommunityMember({ communityId })

  const { mutation: removeCommunityMember } = useAdminRemoveCommunityMember({ communityId })
  const { mutation: toggleCommunityAdmin } = useAdminToggleCommunityAdmin({ communityId })

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
