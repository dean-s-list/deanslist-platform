import {
  useManagerAddCommunityManager,
  useManagerGetCommunityManagers,
  useManagerRemoveCommunityManager,
  useManagerToggleCommunityAdmin,
} from '@deanslist-platform/web-community-data-access'
import { CommunityUiSettingsManagers } from '@deanslist-platform/web-community-ui'

export function ManagerCommunityDetailManagersTab({ communityId }: { communityId: string }) {
  const { items, query } = useManagerGetCommunityManagers({ communityId })
  const { mutation: addCommunityManager } = useManagerAddCommunityManager({ communityId })

  const { mutation: removeCommunityManager } = useManagerRemoveCommunityManager({ communityId })
  const { mutation: toggleCommunityAdmin } = useManagerToggleCommunityAdmin({ communityId })

  function refresh() {
    query.refetch()
  }

  return (
    <CommunityUiSettingsManagers
      items={items}
      isLoading={query.isLoading}
      remove={(userId) => removeCommunityManager.mutateAsync(userId).then(refresh)}
      toggle={(userId) => toggleCommunityAdmin.mutateAsync(userId).then(refresh)}
      add={(userId) => addCommunityManager.mutateAsync(userId).then(refresh)}
    />
  )
}
