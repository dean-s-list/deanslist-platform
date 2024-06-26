import { CoreUiBackLink, CoreUiButton, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useUserFindManyTeam } from '@deanslist-platform/web-team-data-access'
import { TeamUiGrid } from '@deanslist-platform/web-team-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconPlus } from '@tabler/icons-react'

export function ManagerTeamListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyTeam({
    limit: 12,
  })

  return (
    <UiPage
      title="Teams"
      leftAction={<CoreUiBackLink label="Back to overview" to="/management" />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <CoreUiButton to="create" iconLeft={IconPlus}>
            Add Team
          </CoreUiButton>
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
