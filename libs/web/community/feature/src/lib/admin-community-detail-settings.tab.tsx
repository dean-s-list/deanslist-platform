import { useAdminFindOneCommunity } from '@deanslist-platform/web-community-data-access'
import { AdminCommunityUiUpdateForm } from '@deanslist-platform/web-community-ui'
import { UiCard, UiError, UiLoader, UiTabRoutes } from '@pubkey-ui/core'
import { AdminCommunityDetailChannelsTab } from './admin-community-detail-channels-tab'
import { AdminCommunityDetailMembersTab } from './admin-community-detail-members-tab'

export function AdminCommunityDetailSettingsTab({ communityId }: { communityId: string }) {
  const { item, query, updateCommunity } = useAdminFindOneCommunity({ communityId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return (
    <UiTabRoutes
      tabs={[
        {
          path: 'members',
          label: 'Members',
          element: (
            <UiCard>
              <AdminCommunityDetailMembersTab communityId={item.id} />
            </UiCard>
          ),
        },
        {
          path: 'channels',
          label: 'Channels',
          element: (
            <UiCard>
              <AdminCommunityDetailChannelsTab communityId={item.id} />
            </UiCard>
          ),
        },
        {
          path: 'settings',
          label: 'Community Settings',
          element: (
            <UiCard>
              <AdminCommunityUiUpdateForm community={item} submit={updateCommunity} />
            </UiCard>
          ),
        },
      ]}
    />
  )
}
