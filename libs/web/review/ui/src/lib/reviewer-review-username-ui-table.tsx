import { Review } from '@deanslist-platform/sdk'
import { CoreUiRating } from '@deanslist-platform/web-core-ui'
import { ProjectUiItem, ProjectUiStatusBadge } from '@deanslist-platform/web-project-ui'
import { ActionIcon, Group, ScrollArea, Text } from '@mantine/core'
import { UiStack, UiTime } from '@pubkey-ui/core'
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
              item.projectMember?.project ? (
                <ProjectUiItem project={item.projectMember?.project} to={item.viewUrl}>
                  <UiTime size="xs" c="dimmed" date={new Date(item.createdAt ?? '0')} />
                </ProjectUiItem>
              ) : null,
          },
          {
            width: '15%',
            accessor: 'status',
            render: (item) => <ProjectUiStatusBadge status={item.projectMember?.project?.status} />,
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
