import { CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useUserFindManyTeam } from '@deanslist-platform/web-team-data-access'
import { TeamUiGrid } from '@deanslist-platform/web-team-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'

export function UserTeamListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyTeam({
    limit: 12,
  })

  return (
    <UiPage
      title="Teams"
      rightAction={
        <Group>
          <UiDebugModal data={items} />
        </Group>
      }
    >
      <Group>
        <CoreUiSearchField placeholder="Search team" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <TeamUiGrid
          teams={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No teams found" />
      )}
    </UiPage>
  )
}
