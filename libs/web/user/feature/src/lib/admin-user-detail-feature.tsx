import { CoreUiBack } from '@deanslist-platform/web-core-ui'
import { useAdminFindOneUser } from '@deanslist-platform/web-user-data-access'
import { UserUiAvatar } from '@deanslist-platform/web-user-ui'
import { Button, Group } from '@mantine/core'
import { UiDebugModal, UiError, UiLoader, UiPage, UiStack, UiTabRoutes } from '@pubkey-ui/core'
import { Link, useParams } from 'react-router-dom'
import { AdminUserDetailFeatureIdentities } from './admin-user-detail-feature-identities'
import { AdminUserDetailFeatureSettings } from './admin-user-detail-feature-settings'

export function AdminUserDetailFeature() {
  const { userId } = useParams<{ userId: string }>() as { userId: string }
  const { query, item } = useAdminFindOneUser({ userId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="User not found" />
  }

  return (
    <UiPage
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
          <Button size="sm" variant="light" component={Link} to={item.profileUrl}>
            View Profile
          </Button>
        </Group>
      }
      title={
        <Group gap="xs">
          <UserUiAvatar size="sm" user={item} /> {item.username}
        </Group>
      }
    >
      <UiStack>
        <UiTabRoutes
          tabs={[
            {
              path: 'settings',
              label: 'Settings',
              element: <AdminUserDetailFeatureSettings userId={userId} />,
            },
            {
              path: 'identities',
              label: 'Identities',
              element: <AdminUserDetailFeatureIdentities userId={userId} />,
            },
          ]}
        />
      </UiStack>
    </UiPage>
  )
}
