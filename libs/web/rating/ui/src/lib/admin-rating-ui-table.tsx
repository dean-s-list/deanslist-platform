import { Rating } from '@deanslist-platform/sdk'
import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function AdminRatingUiTable({
  deleteRating,
  ratings = [],
}: {
  deleteRating: (rating: Rating) => void
  ratings: Rating[]
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
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteRating(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={ratings}
      />
    </ScrollArea>
  )
}
