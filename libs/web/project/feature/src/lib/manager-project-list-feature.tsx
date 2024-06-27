import { CoreUiDebugModal, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useManagerFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiGrid } from '@deanslist-platform/web-project-ui'
import { Button, Group } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function ManagerProjectListFeature({ communityId }: { communityId?: string }) {
  const { items, pagination, query, setSearch } = useManagerFindManyProject({
    communityId,
  })

  return (
    <UiStack>
      <Group>
        <CoreUiSearchField placeholder="Search project" setSearch={setSearch} />
        <CoreUiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
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
    </UiStack>
  )
}
