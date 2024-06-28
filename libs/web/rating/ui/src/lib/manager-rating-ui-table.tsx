import { Rating } from '@deanslist-platform/sdk'
import { ActionIcon, Anchor, Group, ScrollArea } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function ManagerRatingUiTable({
  deleteRating,
  ratings = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteRating: (rating: Rating) => void
  ratings: Rating[]
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        onPageChange={onPageChange}
        page={page ?? 1}
        recordsPerPage={recordsPerPage ?? 10}
        totalRecords={totalRecords ?? 1}
        columns={[
          {
            accessor: 'content',
            render: (item) => (
              <Anchor component={Link} to={`/ratings/${item.id}`} size="sm" fw={500}>
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
                <ActionIcon
                  color="brand"
                  variant="light"
                  size="sm"
                  component={Link}
                  to={`/ratings/${item.id}/settings`}
                >
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
