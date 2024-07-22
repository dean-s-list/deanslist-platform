import { useManagerFindManyCommunity } from '@deanslist-platform/web-community-data-access'
import { CoreUiDebugModal, CoreUiSearchField, modalStyles, pinkGradient } from '@deanslist-platform/web-core-ui'
import { useManagerFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiEmptyState, ProjectUiGrid } from '@deanslist-platform/web-project-ui'
import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiError, UiLoader, UiPage, UiStack } from '@pubkey-ui/core'
import { IconChairDirector, IconPlus } from '@tabler/icons-react'
import { ManagerProjectCreateFeature } from './manager-project-create-feature'

export function ManagerProjectListFeature({ communityId }: { communityId?: string }) {
  const { items: communities } = useManagerFindManyCommunity()
  const { items, pagination, query, search, setSearch } = useManagerFindManyProject({
    communityId,
  })

  const page = (
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
              centered: true,
              radius: 'xl',
              styles: { ...modalStyles },
              children: (
                <ManagerProjectCreateFeature
                  communities={communities}
                  refresh={async () => {
                    await query.refetch()
                  }}
                  close={() => modals.closeAll()}
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
        <ProjectUiEmptyState search={search} />
      )}
    </UiStack>
  )

  return communityId ? (
    page
  ) : (
    <UiPage title="Manage Projects" leftAction={<IconChairDirector size={28} />}>
      {page}
    </UiPage>
  )
}
