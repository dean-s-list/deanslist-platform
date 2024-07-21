import { CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useUserFindManyUser } from '@deanslist-platform/web-user-data-access'
import { UserUiGrid } from '@deanslist-platform/web-user-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { IconUsers, IconUserSearch } from '@tabler/icons-react'

export function UserUserListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyUser({
    limit: 12,
  })

  return (
    <UiPage title="Users" leftAction={<IconUsers size={28} />}>
      <Group>
        <CoreUiSearchField size="lg" leftSection={<IconUserSearch />} placeholder="Search user" setSearch={setSearch} />
      </Group>
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UserUiGrid
          users={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="User not found" />
      )}
    </UiPage>
  )
}
