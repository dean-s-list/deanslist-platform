import { useAuth } from '@deanslist-platform/web-auth-data-access'
import {
  useManagerFindOneCommunity,
  useManagerGetCommunityManager,
} from '@deanslist-platform/web-community-data-access'
import { CommunityUiItem } from '@deanslist-platform/web-community-ui'
import { CoreUiButton, CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { ManagerProjectCommunityFeature } from '@deanslist-platform/web-project-feature'
import { Group } from '@mantine/core'
import { UiContainer, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { IconSettings, IconShield, IconUsers } from '@tabler/icons-react'
import { useMemo } from 'react'
import { Navigate, RouteObject, useLocation, useParams, useRoutes } from 'react-router-dom'
import { ManagerCommunityDetailManagersTab } from './manager-community-detail-managers-tab'
import { ManagerCommunitySettingsGeneralTab } from './manager-community-settings-general.tab'

export function ManagerCommunityDetailFeature() {
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, query } = useManagerFindOneCommunity({ communityId })
  const { isCommunityAdmin } = useManagerGetCommunityManager({ communityId })
  const { isAdmin } = useAuth()
  const { pathname } = useLocation()

  const routes: RouteObject[] = useMemo(
    () => [
      {
        index: true,
        element: <Navigate to="projects" replace />,
      },
      {
        path: 'projects/*',
        element: <ManagerProjectCommunityFeature communityId={communityId} />,
      },
      {
        path: 'managers',
        element: isCommunityAdmin ? <ManagerCommunityDetailManagersTab communityId={communityId} /> : null,
      },
      {
        path: 'settings',
        element: isCommunityAdmin ? <ManagerCommunitySettingsGeneralTab communityId={communityId} /> : null,
      },
    ],
    [isCommunityAdmin],
  )

  const router = useRoutes(routes)

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
          {isCommunityAdmin ? (
            <Group>
              <CoreUiDebugModal data={item} />
              <CoreUiButton
                to={`${item.manageUrl}/managers`}
                variant={pathname.startsWith(`${item.manageUrl}/managers`) ? 'primary' : 'light'}
                size="xs"
                iconLeft={IconUsers}
              >
                Managers
              </CoreUiButton>
              <CoreUiButton
                to={`${item.manageUrl}/settings`}
                variant={pathname.startsWith(`${item.manageUrl}/settings`) ? 'primary' : 'light'}
                size="xs"
                iconLeft={IconSettings}
              >
                Settings
              </CoreUiButton>
              {isAdmin ? (
                <CoreUiButton to={`/admin/communities/${communityId}`} variant="light" size="xs" iconLeft={IconShield}>
                  Admin
                </CoreUiButton>
              ) : null}
            </Group>
          ) : null}
        </UiGroup>
        {router}
      </UiStack>
    </UiContainer>
  )
}
