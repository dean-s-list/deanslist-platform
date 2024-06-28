import { Review } from '@deanslist-platform/sdk'
import { UserUiItem } from '@deanslist-platform/web-user-ui'
import { ActionIcon, Group, Progress, Rating as MantineRating, ScrollArea, Tooltip } from '@mantine/core'
import { UiTime } from '@pubkey-ui/core'
import { IconMaximize } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

export function ReviewerReviewProjectUiTable({ reviews = [] }: { reviews: Review[] }) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'reviewer',
            render: (item) =>
              item.reviewer ? (
                <UserUiItem
                  user={item.reviewer}
                  to={item.viewUrl}
                  label={<UiTime size="xs" c="dimmed" date={new Date(item.createdAt ?? '0')} />}
                />
              ) : null,
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
