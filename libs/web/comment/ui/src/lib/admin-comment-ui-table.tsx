import { Comment } from '@deanslist-platform/sdk'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function AdminCommentUiTable({
  deleteComment,
  comments = [],
}: {
  deleteComment: (comment: Comment) => void
  comments: Comment[]
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'content',
            render: (item) => (
              <Anchor component={Link} to={`./${item.id}`} size="sm" fw={500}>
                {item.content}
              </Anchor>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <CoreUiDebugModal data={item} />
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteComment(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={comments}
      />
    </ScrollArea>
  )
}
