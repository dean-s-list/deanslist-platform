import { useAdminFindOneCommunity } from '@deanslist-platform/web-community-data-access'
import { AdminCommunityUiUpdateForm, CommunityUiItem } from '@deanslist-platform/web-community-ui'
import { CoreUiBack, CoreUiButton, CoreUiDebugModal, CoreUiPage } from '@deanslist-platform/web-core-ui'
import { Group } from '@mantine/core'
import { UiCard, UiError, UiLoader, UiTabRoutes } from '@pubkey-ui/core'
import { IconChairDirector } from '@tabler/icons-react'
import { useLocation, useParams } from 'react-router-dom'
import { AdminCommunityDetailChannelsTab } from './admin-community-detail-channels-tab'
import { AdminCommunityDetailManagersTab } from './admin-community-detail-managers-tab'

export function AdminCommunityDetailFeature() {
  const { pathname } = useLocation()
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, query, updateCommunity } = useAdminFindOneCommunity({ communityId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return (
    <CoreUiPage
      withContainer={false}
      title={<CommunityUiItem avatarProps={{ size: 'sm' }} community={item} />}
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <CoreUiDebugModal data={item} />
          {item.manageUrl ? (
            <CoreUiButton to={item.manageUrl} variant="light" size="xs" iconLeft={IconChairDirector}>
              Manage community
            </CoreUiButton>
          ) : null}
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          {
            path: 'managers',
            label: 'Managers',
            element: <AdminCommunityDetailManagersTab communityId={item.id} />,
          },
          {
            path: 'channels',
            label: 'Channels',
            element: <AdminCommunityDetailChannelsTab communityId={item.id} />,
          },
          {
            path: 'settings',
            label: 'Settings',
            element: (
              <UiCard>
                <AdminCommunityUiUpdateForm community={item} submit={updateCommunity} />
              </UiCard>
            ),
          },
        ]}
      />
    </CoreUiPage>
  )
}
