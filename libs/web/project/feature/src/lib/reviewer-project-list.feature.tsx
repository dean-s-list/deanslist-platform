import { getEnumOptions, ProjectStatus } from '@deanslist-platform/sdk'
import { CoreUiCustomSelect, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { orderByOptions, useReviewerFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiGrid } from '@deanslist-platform/web-project-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconArrowDown, IconArrowsUpDown, IconArrowUp, IconCube, IconFilter } from '@tabler/icons-react'

function getOrderByOption(value: string | null) {
  return orderByOptions.find((option) => option.value === value) ?? orderByOptions[0]
}

export default function ReviewerProjectListFeature() {
  const { items, pagination, query, setSearch, status, setStatus, orderBy, setOrderBy } = useReviewerFindManyProject({
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
            onChange={(status) => setStatus(status as ProjectStatus)}
            data={getEnumOptions(ProjectStatus)}
          />
          <CoreUiCustomSelect
            label="Order by"
            smIcon={<IconArrowsUpDown />}
            value={orderBy.value}
            renderOption={(value) => {
              const option = getOrderByOption(value)
              return (
                <Group gap={5}>
                  {option.label}
                  {option.sort === 'asc' ? <IconArrowUp size={16} /> : <IconArrowDown size={16} />}
                </Group>
              )
            }}
            onChange={(value) => setOrderBy(getOrderByOption(value))}
            data={orderByOptions}
          />
        </Group>
        <CoreUiSearchField placeholder="Search project" setSearch={setSearch} size="md" />
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
