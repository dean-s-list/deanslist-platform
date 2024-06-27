import { useAdminFindManyCommunity } from '@deanslist-platform/web-community-data-access'
import { AdminCommunityUiTable } from '@deanslist-platform/web-community-ui'
import { CoreUiBack, CoreUiPageLimit, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'

export function AdminCommunityListFeature() {
  const { deleteCommunity, items, pagination, query, setSearch } = useAdminFindManyCommunity({
    limit: 10,
  })

  return (
    <UiPage
      title="Communities"
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
        </Group>
      }
    >
      <Group>
        <CoreUiSearchField placeholder="Search community" setSearch={setSearch} />
        <CoreUiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminCommunityUiTable
          deleteCommunity={(community) => {
            if (!window.confirm('Are you sure?')) return
            return deleteCommunity(community.id)
          }}
          communities={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No communities found" />
      )}
    </UiPage>
  )
}
