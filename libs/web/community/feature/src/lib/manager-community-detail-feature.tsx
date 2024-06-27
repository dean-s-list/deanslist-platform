import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { useManagerFindOneCommunity, useManagerGetCommunityMember } from '@deanslist-platform/web-community-data-access'
import { CommunityUiItem } from '@deanslist-platform/web-community-ui'
import { CoreUiBackLink, CoreUiButton, CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { ManagerProjectCommunityFeature } from '@deanslist-platform/web-project-feature'
import { ActionIcon, Group, Tooltip } from '@mantine/core'
import { UiError, UiGroup, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconSettings, IconShield, IconUsers } from '@tabler/icons-react'
import { useMemo } from 'react'
import { Link, Navigate, RouteObject, useLocation, useParams, useRoutes } from 'react-router-dom'
import { ManagerCommunityDetailMembersTab } from './manager-community-detail-members-tab'
import { ManagerCommunitySettingsGeneralTab } from './manager-community-settings-general.tab'

export function ManagerCommunityDetailFeature() {
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, query } = useManagerFindOneCommunity({ communityId })
  const { isCommunityAdmin } = useManagerGetCommunityMember({ communityId })
  const { isAdmin } = useAuth()
  const { pathname } = useLocation()

  const routes: RouteObject[] = useMemo(() => {
    const res: RouteObject[] = [
      { index: true, element: <Navigate to="projects" replace /> },
      { path: 'projects/*', element: <ManagerProjectCommunityFeature communityId={communityId} /> },
    ]
    if (isCommunityAdmin) {
      res.push(
        {
          path: 'members',
          element: <ManagerCommunityDetailMembersTab communityId={communityId} />,
        },
        {
          path: 'settings',
          element: <ManagerCommunitySettingsGeneralTab communityId={communityId} />,
        },
      )
    }
    return res
  }, [])

  const router = useRoutes(routes)

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Community not found." />
  }

  return (
    <UiPage leftAction={<CoreUiBackLink label="Back to communities" />}>
      <UiGroup>
        <CommunityUiItem community={item} to={item.manageUrl} />
        {isCommunityAdmin ? (
          <Group>
            <CoreUiDebugModal data={item} />
            {isAdmin ? (
              <Tooltip label="Community admin">
                <ActionIcon component={Link} to={`/admin/communities/${communityId}`} variant="light">
                  <IconShield size={16} />
                </ActionIcon>
              </Tooltip>
            ) : null}
            <CoreUiButton
              to={`${item.manageUrl}/members`}
              variant={pathname.startsWith(`${item.manageUrl}/members`) ? 'primary' : 'light'}
              size="sm"
              iconLeft={IconUsers}
            >
              Members
            </CoreUiButton>
            <CoreUiButton
              to={`${item.manageUrl}/settings`}
              variant={pathname.startsWith(`${item.manageUrl}/settings`) ? 'primary' : 'light'}
              size="sm"
              iconLeft={IconSettings}
            >
              Settings
            </CoreUiButton>
          </Group>
        ) : null}
      </UiGroup>
      {router}
    </UiPage>
  )
}
