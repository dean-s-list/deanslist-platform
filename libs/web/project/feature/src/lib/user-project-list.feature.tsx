import { getEnumOptions, ProjectStatus } from '@deanslist-platform/sdk'
import { CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useUserFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiGrid } from '@deanslist-platform/web-project-ui'
import { Group, Select } from '@mantine/core'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconSearch } from '@tabler/icons-react'

export default function UserProjectListFeature() {
  const { items, pagination, query, setSearch, status, setStatus } = useUserFindManyProject({
    limit: 24,
  })

  return (
    <UiPage>
      <Group>
        <CoreUiSearchField
          leftSection={<IconSearch size={24} />}
          size="lg"
          radius="xl"
          placeholder="Search project"
          setSearch={setSearch}
        />
        <Select
          radius="xl"
          size="lg"
          value={status}
          allowDeselect={false}
          onChange={(status) => setStatus((status === '' ? undefined : status) as ProjectStatus)}
          data={[...getEnumOptions(ProjectStatus).map((o) => ({ ...o, label: `State: ${o.value}` }))]}
        />
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
