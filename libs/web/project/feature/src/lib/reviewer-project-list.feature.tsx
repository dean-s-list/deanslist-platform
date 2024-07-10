import { getEnumOptions, ProjectStatus } from '@deanslist-platform/sdk'
import { CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useReviewerFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiGrid } from '@deanslist-platform/web-project-ui'
import { Group, Select } from '@mantine/core'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconCube } from '@tabler/icons-react'

export default function ReviewerProjectListFeature() {
  const { items, pagination, query, setSearch, status, setStatus } = useReviewerFindManyProject({
    limit: 24,
  })

  return (
    <UiPage title="Projects" leftAction={<IconCube size={28} />}>
      <Group>
        <CoreUiSearchField placeholder="Search project" setSearch={setSearch} />
        <Select
          radius="xl"
          size="lg"
          value={status}
          allowDeselect={false}
          onChange={(status) => setStatus((status === '' ? undefined : status) as ProjectStatus)}
          data={getEnumOptions(ProjectStatus)}
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
