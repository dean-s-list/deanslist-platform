import { CoreUiBackLink, CoreUiButton, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useManagerFindManyCommunity } from '@deanslist-platform/web-community-data-access'
import { CommunityUiGrid } from '@deanslist-platform/web-community-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconPlus } from '@tabler/icons-react'

export function ManagerCommunityListFeature() {
  const { items, pagination, query, setSearch } = useManagerFindManyCommunity({
    limit: 12,
  })

  return (
    <UiPage
      title="Communities"
      leftAction={<CoreUiBackLink label="Back to overview" to="/management" />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <CoreUiButton to="create" iconLeft={IconPlus}>
            Add Community
          </CoreUiButton>
        </Group>
      }
    >
      <Group>
        <CoreUiSearchField placeholder="Search community" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <CommunityUiGrid
          communities={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No communities found" />
      )}
    </UiPage>
  )
}
