import { getEnumOptions, OrderDirection, projectOrderByOptions, ProjectStatus } from '@deanslist-platform/sdk'
import { CoreUiCustomSelect, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useReviewerFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiGrid } from '@deanslist-platform/web-project-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconArrowDown, IconArrowsUpDown, IconArrowUp, IconCube, IconFilter } from '@tabler/icons-react'

export default function ReviewerProjectListFeature() {
  const { items, pagination, query, setSearch, status, setStatus, order, setOrder } = useReviewerFindManyProject({
    limit: 24,
  })

  return (
    <UiPage title="Projects" leftAction={<IconCube size={28} />}>
      <Group justify="space-between">
        <Group>
          <CoreUiCustomSelect
            label="State"
            smIcon={<IconFilter />}
            value={status}
            onChange={(status: string | null) => {
              if (!status) return
              setStatus(status as ProjectStatus)
            }}
            data={getEnumOptions(ProjectStatus)}
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
        <CoreUiSearchField maw={160} placeholder="Search project" setSearch={setSearch} size="md" />
      </Group>

      {query.isLoading ? (
        <UiLoader />
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
        <UiInfo message="No projects found" />
      )}
    </UiPage>
  )
}

function OrderOptionLabel({ value }: { value: string | null }) {
  const option = projectOrderByOptions.find((o) => o.value === value)

  if (!option) return null

  return (
    <Group component="span" gap={5}>
      {option.label}
      {option.direction === OrderDirection.Desc ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />}
    </Group>
  )
}
