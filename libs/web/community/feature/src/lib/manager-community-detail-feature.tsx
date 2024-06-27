import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiBack, CoreUiButton } from '@deanslist-platform/web-core-ui'
import { ManagerProjectCommunityFeature } from '@deanslist-platform/web-project-feature'
import { useManagerFindOneCommunity, useManagerGetCommunityMember } from '@deanslist-platform/web-community-data-access'
import { CommunityUiItem } from '@deanslist-platform/web-community-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { IconShield } from '@tabler/icons-react'
import { useParams } from 'react-router-dom'
import { ManagerCommunityDetailMembersTab } from './manager-community-detail-members-tab'
import { ManagerCommunitySettingsGeneralTab } from './manager-community-settings-general.tab'

export function ManagerCommunityDetailFeature() {
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, query } = useManagerFindOneCommunity({ communityId })
  const { isCommunityAdmin } = useManagerGetCommunityMember({ communityId })
  const { isAdmin } = useAuth()

  const tabs: UiTabRoute[] = [
    {
      path: 'projects',
      label: 'Projects',
      element: <ManagerProjectCommunityFeature communityId={communityId} />,
    },
  ]

  if (isCommunityAdmin) {
    tabs.push(
      {
        path: 'members',
        label: 'Members',
        element: <ManagerCommunityDetailMembersTab communityId={communityId} />,
      },
      {
        path: 'settings',
        label: 'Community Settings',
        element: <ManagerCommunitySettingsGeneralTab communityId={communityId} />,
      },
    )
  }

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }
  return (
    <UiPage
      title={<CommunityUiItem community={item} />}
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
          {isAdmin ? (
            <CoreUiButton to={`/admin/communities/${communityId}`} iconLeft={IconShield}>
              Manage Community
            </CoreUiButton>
          ) : null}
        </Group>
      }
    >
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}
