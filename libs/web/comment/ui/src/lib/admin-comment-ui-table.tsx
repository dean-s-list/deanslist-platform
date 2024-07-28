import { Comment } from '@deanslist-platform/sdk'
import { CoreUiContent, CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

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
            render: (item) => <CoreUiContent content={item.content} />,
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
