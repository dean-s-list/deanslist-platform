import { CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useUserFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiGrid } from '@deanslist-platform/web-project-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'

export default function UserProjectListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyProject({
    limit: 24,
  })

  return (
    <UiPage
      title="Projects"
      rightAction={
        <Group>
          <UiDebugModal data={items} />
        </Group>
      }
    >
      <Group>
        <CoreUiSearchField placeholder="Search project" setSearch={setSearch} />
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
