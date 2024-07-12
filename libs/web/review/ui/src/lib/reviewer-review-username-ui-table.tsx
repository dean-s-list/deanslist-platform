import { Review } from '@deanslist-platform/sdk'
import { ProjectUiItem, ProjectUiStatusBadge } from '@deanslist-platform/web-project-ui'
import { ActionIcon, Group, Progress, Rating as MantineRating, ScrollArea, Tooltip } from '@mantine/core'
import { UiTime } from '@pubkey-ui/core'
import { IconMaximize } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function ReviewerReviewUsernameUiTable({ reviews = [] }: { reviews: Review[] }) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        styles={{
          table: { backgroundColor: 'transparent' },
          root: { backgroundColor: 'transparent' },
        }}
        noHeader
        withRowBorders={false}
        withTableBorder={false}
        shadow="xs"
        columns={[
          {
            accessor: 'name',
            render: (item) =>
              item.project ? (
                <ProjectUiItem
                  project={item.project}
                  to={item.viewUrl}
                  label={<UiTime size="xs" c="dimmed" date={new Date(item.createdAt ?? '0')} />}
                />
              ) : null,
          },
          {
            width: '15%',
            accessor: 'status',
            render: (item) => <ProjectUiStatusBadge status={item.project?.status} />,
          },
          {
            width: '15%',
            accessor: 'ratingAverage',
            render: (item) => (
              <Group>
                <Tooltip label={`Rating average: ${item.ratingAverage ?? 0}`} withArrow position="top">
                  <MantineRating fractions={2} size="sm" readOnly value={item.ratingAverage ?? 0} />
                </Tooltip>
              </Group>
            ),
          },
          {
            width: '15%',
            accessor: 'ratingProgress',
            render: (item) => (
              <Tooltip label={`Rating progress: ${item.ratingProgress ?? 0}`} withArrow position="top">
                <Progress value={item.ratingProgress ?? 0} size="lg" radius="xl" color="brand" />
              </Tooltip>
            ),
          },
          {
            width: '5%',
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`${item.viewUrl}`}>
                  <IconMaximize size={16} />
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
