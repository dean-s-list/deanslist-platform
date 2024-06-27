import { useAdminFindOneCommunity } from '@deanslist-platform/web-community-data-access'
import { AdminCommunityUiUpdateForm, CommunityUiItem } from '@deanslist-platform/web-community-ui'
import { CoreUiBack, CoreUiDebugModal, CoreUiPage } from '@deanslist-platform/web-core-ui'
import { ActionIcon, Group, Tooltip } from '@mantine/core'
import { UiCard, UiError, UiLoader, UiTabRoutes } from '@pubkey-ui/core'
import { IconChairDirector } from '@tabler/icons-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AdminCommunityDetailChannelsTab } from './admin-community-detail-channels-tab'
import { AdminCommunityDetailMembersTab } from './admin-community-detail-members-tab'

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

  const baseUrl = `/admin/communities/${communityId}`
  return (
    <CoreUiPage
      withContainer={false}
      title={<CommunityUiItem avatarProps={{ size: 'sm' }} community={item} to={baseUrl} />}
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <CoreUiDebugModal data={item} />
          {item.manageUrl ? (
            <Tooltip label="Manage community">
              <ActionIcon component={Link} to={item.manageUrl} variant="light">
                <IconChairDirector size={16} />
              </ActionIcon>
            </Tooltip>
          ) : null}
        </Group>
      }
    >
      <UiTabRoutes
        tabs={[
          {
            path: 'members',
            label: 'Members',
            element: <AdminCommunityDetailMembersTab communityId={item.id} />,
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
