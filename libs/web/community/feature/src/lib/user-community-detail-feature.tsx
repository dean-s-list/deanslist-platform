import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiBack, CoreUiButton } from '@deanslist-platform/web-core-ui'
import { useUserFindOneCommunity } from '@deanslist-platform/web-community-data-access'
import { CommunityUiItem } from '@deanslist-platform/web-community-ui'
import { Group } from '@mantine/core'
import { UiDebug, UiDebugModal, UiError, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconShield } from '@tabler/icons-react'
import { useParams } from 'react-router-dom'

export function UserCommunityDetailFeature() {
  const { communityId } = useParams<{ communityId: string }>() as { communityId: string }
  const { item, query } = useUserFindOneCommunity({ communityId })
  const { isAdmin } = useAuth()

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
      <UiDebug data={item} open hideButton />
    </UiPage>
  )
}
