import {
  useAdminAddCommunityManager,
  useAdminGetCommunityManagers,
  useAdminRemoveCommunityManager,
  useAdminToggleCommunityAdmin,
} from '@deanslist-platform/web-community-data-access'
import { CommunityUiSettingsManagers } from '@deanslist-platform/web-community-ui'

export function AdminCommunityDetailManagersTab({ communityId }: { communityId: string }) {
  const { items, query } = useAdminGetCommunityManagers({ communityId })
  const { mutation: addCommunityManager } = useAdminAddCommunityManager({ communityId })

  const { mutation: removeCommunityManager } = useAdminRemoveCommunityManager({ communityId })
  const { mutation: toggleCommunityAdmin } = useAdminToggleCommunityAdmin({ communityId })

  function refresh() {
    query.refetch()
  }

  return (
    <CommunityUiSettingsManagers
      allowSelfToggle
      items={items}
      isLoading={query.isLoading}
      remove={(userId) => removeCommunityManager.mutateAsync(userId).then(refresh)}
      toggle={(userId) => toggleCommunityAdmin.mutateAsync(userId).then(refresh)}
      add={(userId) => addCommunityManager.mutateAsync(userId).then(refresh)}
    />
  )
}
