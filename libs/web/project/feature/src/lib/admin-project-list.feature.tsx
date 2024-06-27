import {
  CoreUiBack,
  CoreUiDebugModal,
  CoreUiPage,
  CoreUiPageLimit,
  CoreUiSearchField,
} from '@deanslist-platform/web-core-ui'
import { useAdminFindManyProject } from '@deanslist-platform/web-project-data-access'
import { AdminProjectUiTable } from '@deanslist-platform/web-project-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader } from '@pubkey-ui/core'

export function AdminProjectListFeature() {
  const { deleteProject, items, pagination, query, setSearch } = useAdminFindManyProject()

  return (
    <CoreUiPage
      withContainer={false}
      title="Projects"
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <CoreUiDebugModal data={items} />
        </Group>
      }
    >
      <Group>
        <CoreUiSearchField placeholder="Search project" setSearch={setSearch} />
        <CoreUiDebugModal data={items} />
        <CoreUiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminProjectUiTable
          deleteProject={(project) => {
            if (!window.confirm('Are you sure?')) return
            return deleteProject(project.id)
          }}
          projects={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No projects found" />
      )}
    </CoreUiPage>
  )
}
