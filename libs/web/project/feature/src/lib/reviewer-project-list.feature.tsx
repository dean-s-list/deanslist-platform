import { getEnumOptions, OrderDirection, projectOrderByOptions, ProjectStatus } from '@deanslist-platform/sdk'
import { CoreUiCustomSelect, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useReviewerFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiGrid } from '@deanslist-platform/web-project-ui'
import { Group, Switch, Text } from '@mantine/core'
import { UiLoader, UiPage, UiStack } from '@pubkey-ui/core'
import { IconArrowDown, IconArrowsUpDown, IconArrowUp, IconCube, IconFilter } from '@tabler/icons-react'

export default function ReviewerProjectListFeature() {
  const { items, pagination, query, mineOnly, setMineOnly, search, setSearch, status, setStatus, order, setOrder } =
    useReviewerFindManyProject({
      limit: 24,
    })

  return (
    <UiPage title="Projects" leftAction={<IconCube size={28} />}>
      <Group justify="space-between">
        <Group>
          <Switch
            label="Show my projects only"
            checked={mineOnly}
            onChange={(e) => setMineOnly(e.currentTarget.checked)}
          />
          <CoreUiCustomSelect
            label="State"
            smIcon={<IconFilter />}
            value={status}
            onChange={(status: string | null) => {
              if (!status) return
              setStatus(status as ProjectStatus)
            }}
            data={getEnumOptions(ProjectStatus).filter((item) => item.value !== ProjectStatus.Draft)}
          />
          <CoreUiCustomSelect
            label="Order by"
            smIcon={<IconArrowsUpDown />}
            value={order}
            renderOption={(value) => <OrderOptionLabel value={value.toString()} />}
            onChange={(val: string | null) => setOrder(val)}
            data={projectOrderByOptions}
          />
        </Group>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : query.isError ? (
        <UiError title="Error loading projects" message={`${query.error?.message}`} />
      ) : items?.length ? (
        <ProjectUiGrid
          projects={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <ProjectEmptyState search={search} />
      )}
    </UiPage>
  )
}

function ProjectEmptyState({ search }: { search?: string }) {
  return (
    <UiStack align="center" justify="center" gap={0}>
      <Text fz={48} c="white" ta="center">
        <span role="img" aria-label="detective">
          🕵️
        </span>
      </Text>
      <Text size="xl" c="white" ta="center">
        We couldn't find any results
        {search ? (
          <span>
            {' '}
            for <strong>{search}</strong>
          </span>
        ) : null}
        .
      </Text>
      <Text size="xl" c="white" ta="center">
        Try adjusting the filters and give it another try. If you still can't find it, then it looks like we don't have
        it yet.
      </Text>
    </UiStack>
  )
}

function OrderOptionLabel({ value }: { value: string | null }) {
  const option = projectOrderByOptions.find((o) => o.value === value)

  if (!option) return null

  return (
    <Group component="span" gap={5}>
      {option.label}
      {option.direction === OrderDirection.Asc ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />}
    </Group>
  )
}
