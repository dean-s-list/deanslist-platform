import { useAdminFindManyCommunity } from '@deanslist-platform/web-community-data-access'
import { AdminCommunityUiTable } from '@deanslist-platform/web-community-ui'
import {
  CoreUiBack,
  CoreUiDebugModal,
  CoreUiPage,
  CoreUiPageLimit,
  CoreUiSearchField,
} from '@deanslist-platform/web-core-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader } from '@pubkey-ui/core'

export function AdminCommunityListFeature() {
  const { deleteCommunity, items, pagination, query, setSearch } = useAdminFindManyCommunity({
    limit: 10,
  })

  return (
    <CoreUiPage
      withContainer={false}
      title="Communities"
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <CoreUiDebugModal data={items} />
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
    </CoreUiPage>
  )
}
