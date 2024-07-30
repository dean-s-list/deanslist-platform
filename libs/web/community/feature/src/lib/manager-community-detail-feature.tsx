import { useAuth } from '@deanslist-platform/web-auth-data-access'
import {
  useManagerFindOneCommunity,
  useManagerGetCommunityManager,
} from '@deanslist-platform/web-community-data-access'
import { CommunityUiItem } from '@deanslist-platform/web-community-ui'
import { CoreUiButton, CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { ManagerProjectFeature } from '@deanslist-platform/web-project-feature'
import { Group } from '@mantine/core'
import { UiContainer, UiError, UiGroup, UiLoader, UiStack, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { IconShield } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ManagerCommunityDetailManagersTab } from './manager-community-detail-managers-tab'
import { ManagerCommunitySettingsGeneralTab } from './manager-community-settings-general.tab'

export function ManagerCommunityDetailFeature() {
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, query } = useManagerFindOneCommunity({ communityId })
  const { isCommunityAdmin } = useManagerGetCommunityManager({ communityId })
  const { isAdmin } = useAuth()

  const tabs: UiTabRoute[] = useMemo(
    () =>
      [
        {
          path: 'projects',
          label: 'Projects',
          element: <ManagerProjectFeature communityId={communityId} />,
        },
        isCommunityAdmin
          ? {
              path: 'managers',
              label: 'Managers',
              element: isCommunityAdmin ? <ManagerCommunityDetailManagersTab communityId={communityId} /> : null,
            }
          : null,
        isCommunityAdmin
          ? {
              path: 'settings',
              label: 'Settings',
              element: isCommunityAdmin ? <ManagerCommunitySettingsGeneralTab communityId={communityId} /> : null,
            }
          : null,
      ].filter(Boolean) as UiTabRoute[],
    [isCommunityAdmin, communityId],
  )

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return (
    <UiContainer>
      <UiStack>
        <UiGroup>
          <CommunityUiItem community={item} to={item.manageUrl} />
          <Group>
            <CoreUiDebugModal data={item} />
            {isAdmin ? (
              <CoreUiButton to={`/admin/communities/${communityId}`} variant="light" size="xs" iconLeft={IconShield}>
                Admin
              </CoreUiButton>
            ) : null}
          </Group>
        </UiGroup>
        <UiTabRoutes variant="pills" radius="xl" tabs={tabs} />
      </UiStack>
    </UiContainer>
  )
}
