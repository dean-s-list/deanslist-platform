import { Review } from '@deanslist-platform/sdk'
import { ProjectUiItem, ProjectUiStatusBadge } from '@deanslist-platform/web-project-ui'
import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { UiTime } from '@pubkey-ui/core'
import { IconZoomOut } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function ReviewerReviewUsernameUiTable({ reviews = [] }: { reviews: Review[] }) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'name',
            render: (item) => (item.project ? <ProjectUiItem project={item.project} to={item.viewUrl} /> : null),
          },
          {
            accessor: 'status',
            render: (item) => <ProjectUiStatusBadge status={item.project?.status} />,
          },
          {
            accessor: 'created',
            render: (item) => <UiTime date={new Date(item.createdAt ?? '0')} />,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`${item.viewUrl}`}>
                  <IconZoomOut size={16} />
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
