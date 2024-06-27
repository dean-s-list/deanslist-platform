import { useUserFindManyCommunity } from '@deanslist-platform/web-community-data-access'
import { CommunityUiGrid } from '@deanslist-platform/web-community-ui'
import { CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'

export function UserCommunityListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyCommunity({
    limit: 12,
  })

  return (
    <UiPage
      title="Communities"
      rightAction={
        <Group>
          <UiDebugModal data={items} />
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
