import { CoreUiDebugModal, CoreUiSearchField, pinkGradient } from '@deanslist-platform/web-core-ui'
import { useManagerFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiGrid } from '@deanslist-platform/web-project-ui'
import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { IconPlus } from '@tabler/icons-react'
import { ManagerProjectCreateFeature } from './manager-project-create-feature'

export function ManagerProjectListFeature({ communityId }: { communityId: string }) {
  const { items, pagination, query, setSearch } = useManagerFindManyProject({
    communityId,
  })

  return (
    <UiStack>
      <Group>
        <CoreUiSearchField placeholder="Search project" setSearch={setSearch} />
        <CoreUiDebugModal data={items} />
        <Button
          radius="xl"
          styles={{ root: { ...pinkGradient } }}
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            modals.open({
              title: 'Create a project',
              children: (
                <ManagerProjectCreateFeature
                  communityId={communityId}
                  afterSubmit={async () => {
                    query.refetch()
                    modals.closeAll()
                  }}
                />
              ),
            })
          }}
        >
          Add Project
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
