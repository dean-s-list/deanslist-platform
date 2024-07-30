import type { User } from '@deanslist-platform/sdk'
import { CoreUiDivider } from '@deanslist-platform/web-core-ui'
import { UserUiItem } from '@deanslist-platform/web-user-ui'
import { ActionIcon } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { IconTrash } from '@tabler/icons-react'

export function ProjectUiMemberTable(props: {
  users: User[]
  delete: (userId: string) => Promise<boolean | null | undefined>
}) {
  if (!props.users?.length) {
    return null
  }
  return (
    <UiStack>
      {props.users?.map((user) => (
        <UiStack key={user.id}>
          <UiGroup px="xs">
            <UserUiItem user={user} />
            <ActionIcon
              color="red"
              variant="light"
              size="sm"
              onClick={() => {
                if (!window.confirm('Are you sure?')) return
                return props.delete(user.id)
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </UiGroup>
          <CoreUiDivider />
        </UiStack>
      ))}
    </UiStack>
  )
}
