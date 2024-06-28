import type { User } from '@deanslist-platform/sdk'
import { UserUiItem } from '@deanslist-platform/web-user-ui'
import { ActionIcon, Table } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

export function ProjectUiMemberTable(props: {
  users: User[]
  delete: (userId: string) => Promise<boolean | null | undefined>
}) {
  if (!props.users?.length) {
    return null
  }
  return (
    <Table withTableBorder>
      <Table.Tbody>
        {props.users?.map((user) => (
          <Table.Tr key={user.id}>
            <Table.Td>
              <UserUiItem user={user} />
            </Table.Td>
            <Table.Td align="right">
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
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
