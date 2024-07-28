import { getEnumOptions, projectOrderByOptions, ProjectStatus } from '@deanslist-platform/sdk'
import { useManagerFindManyCommunity } from '@deanslist-platform/web-community-data-access'
import {
  CoreUiCustomSelect,
  CoreUiDebugModal,
  CoreUiSearchField,
  modalStyles,
  pinkGradient,
} from '@deanslist-platform/web-core-ui'
import { useManagerFindManyProject } from '@deanslist-platform/web-project-data-access'
import { ProjectUiEmptyState, ProjectUiGrid } from '@deanslist-platform/web-project-ui'
import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiError, UiGroup, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconArrowsUpDown, IconChairDirector, IconFilter, IconPlus } from '@tabler/icons-react'
import { ManagerProjectCreateFeature } from './manager-project-create-feature'
import { OrderOptionLabel } from './reviewer-project-list.feature'

export function ManagerProjectListFeature({ communityId }: { communityId?: string }) {
  const { items: communities } = useManagerFindManyCommunity({ limit: 1000 })
  const { items, pagination, query, search, setSearch, status, setStatus, order, setOrder } = useManagerFindManyProject(
    {
      communityId,
    },
  )

  const page = (
    <>
      <UiGroup>
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
      </UiGroup>

      {query.isLoading ? (
        <UiLoader />
      ) : query.isError ? (
        <UiError title="Error loading projects" message={`${query.error?.message}`} />
      ) : items?.length ? (
        <ProjectUiGrid
          projects={items}
          page={pagination.page}
          totalPages={pagination.total / pagination.limit}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <ProjectUiEmptyState search={search} />
      )}
    </>
  )

  return communityId ? (
    page
  ) : (
    <UiPage title="Manage Projects" leftAction={<IconChairDirector size={28} />}>
      {page}
    </UiPage>
  )
}
