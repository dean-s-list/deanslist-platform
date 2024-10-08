import { Review } from '@deanslist-platform/sdk'
import { CoreUiRating } from '@deanslist-platform/web-core-ui'
import { ActionIcon, Anchor, Group, ScrollArea, Text } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function AdminReviewUiTable({
  deleteReview,
  reviews = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteReview: (review: Review) => void
  reviews: Review[]
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
            accessor: 'name',
            render: (item) => (
              <Anchor component={Link} to={`./${item.id}`} size="sm" fw={500}>
                {item.name}
              </Anchor>
            ),
          },
          {
            width: '15%',
            accessor: 'ratingAverage',
            render: (item) => (
              <UiStack gap={2} align="center">
                <Text size="xs">{item.commentCount} comments</Text>
                {item?.projectMember?.project?.status === 'Closed' ? (
                  <CoreUiRating
                    readOnly
                    value={item.ratingAverage}
                    tooltip={`Rating average: ${item.ratingAverage ?? 0}`}
                  />
                ) : null}
              </UiStack>
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
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteReview(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={reviews}
      />
    </ScrollArea>
  )
}
