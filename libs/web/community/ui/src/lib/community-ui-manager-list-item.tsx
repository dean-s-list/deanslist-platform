import { CommunityManager } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiCard } from '@deanslist-platform/web-core-ui'
import { UserUiItem } from '@deanslist-platform/web-user-ui'
import { ActionIcon, Group, Switch } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { IconTrash } from '@tabler/icons-react'

export function CommunityUiManagerListItem({
  allowSelfToggle = false,
  item,
  toggle,
  remove,
}: {
  allowSelfToggle?: boolean
  item: CommunityManager
  toggle: () => Promise<void>
  remove: () => Promise<void>
}) {
  const { user } = useAuth()
  const isSelf = user?.id === item.userId
  return (
    <CoreUiCard key={item.id}>
      <UiStack>
        <UiGroup>
          {item.user ? <UserUiItem user={item.user} /> : <div />}

          <Group>
            <Switch
              disabled={isSelf && !allowSelfToggle}
              label={item.admin ? 'Admin' : 'Manager'}
              checked={item.admin ?? false}
              onChange={toggle}
            />
            <ActionIcon
              disabled={!!item.admin}
              size="sm"
              color="red"
              variant="light"
              onClick={() => {
                modals.openConfirmModal({
                  title: 'Remove Community Manager',
                  children: `Are you sure you want to remove ${
                    item.user?.name ?? item.user?.username
                  } from the community?`,
                  labels: { confirm: 'Remove', cancel: 'Cancel' },
                  onConfirm: remove,
                })
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </UiGroup>
      </UiStack>
    </CoreUiCard>
  )
}
