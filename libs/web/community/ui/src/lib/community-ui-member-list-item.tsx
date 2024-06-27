import type { CommunityMember } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { UserUiItem } from '@deanslist-platform/web-user-ui'
import { ActionIcon, Group, Switch } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiCard, UiGroup, UiStack } from '@pubkey-ui/core'
import { IconTrash } from '@tabler/icons-react'

export function CommunityUiMemberListItem({
  item,
  toggle,
  remove,
}: {
  item: CommunityMember
  toggle: () => Promise<void>
  remove: () => Promise<void>
}) {
  const { user } = useAuth()
  return (
    <UiCard key={item.id}>
      <UiStack>
        <UiGroup>
          {item.user ? <UserUiItem user={item.user} /> : <div />}

          <Group>
            <Switch
              disabled={user?.id === item.userId}
              label={item.admin ? 'Admin' : 'Member'}
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
                  title: 'Remove Community Member',
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
    </UiCard>
  )
}
