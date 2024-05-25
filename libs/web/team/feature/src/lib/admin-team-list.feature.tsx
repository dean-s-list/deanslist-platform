import { CoreUiBack, CoreUiPageLimit, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useAdminFindManyTeam } from '@deanslist-platform/web-team-data-access'
import { AdminTeamUiTable } from '@deanslist-platform/web-team-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'

export function AdminTeamListFeature() {
  const { deleteTeam, items, pagination, query, setSearch } = useAdminFindManyTeam({
    limit: 10,
  })

  return (
    <UiPage
      title="Teams"
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
        </Group>
      }
    >
      <Group>
        <CoreUiSearchField placeholder="Search team" setSearch={setSearch} />
        <CoreUiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminTeamUiTable
          deleteTeam={(team) => {
            if (!window.confirm('Are you sure?')) return
            return deleteTeam(team.id)
          }}
          teams={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No teams found" />
      )}
    </UiPage>
  )
}
