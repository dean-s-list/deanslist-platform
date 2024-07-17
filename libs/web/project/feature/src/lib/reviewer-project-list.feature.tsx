import { getEnumOptions, ProjectStatus } from '@deanslist-platform/sdk'
import { cardGradient, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { orderByOptions, useReviewerFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiGrid } from '@deanslist-platform/web-project-ui'
import { Group, Select } from '@mantine/core'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconCube } from '@tabler/icons-react'

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
          <Select
            styles={{ input: { ...cardGradient, border: '1px solid white' } }}
            radius="xl"
            size="sm"
            leftSection="State:"
            leftSectionWidth={70}
            value={status}
            allowDeselect={false}
            onChange={(status) => setStatus((status === '' ? undefined : status) as ProjectStatus)}
            data={getEnumOptions(ProjectStatus)}
          />
          <Select
            styles={{ input: { ...cardGradient, border: '1px solid white' } }}
            radius="xl"
            size="sm"
            value={orderBy.value}
            leftSection="Order by:"
            leftSectionWidth={85}
            allowDeselect={false}
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
