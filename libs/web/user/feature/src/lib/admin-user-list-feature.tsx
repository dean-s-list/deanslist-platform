import { CoreUiBack, CoreUiPageLimit, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useAdminFindManyUser } from '@deanslist-platform/web-user-data-access'
import { AdminUserUiTable } from '@deanslist-platform/web-user-ui'
import { Button, Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'
import { AdminUserUiSelectRole } from './admin-user-ui-select-role'
import { AdminUserUiSelectStatus } from './admin-user-ui-select-status'

export function AdminUserListFeature() {
  const { deleteUser, items, pagination, query, role, setRole, setSearch, setStatus, status } = useAdminFindManyUser()

  return (
    <UiPage
      title="Users"
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <CoreUiSearchField placeholder="Search user" setSearch={setSearch} />
        <AdminUserUiSelectRole value={role} setValue={setRole} />
        <AdminUserUiSelectStatus value={status} setValue={setStatus} />
        <CoreUiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminUserUiTable
          deleteUser={(user) => {
            if (!window.confirm('Are you sure?')) return
            return deleteUser(user.id)
          }}
          users={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="User not found" />
      )}
    </UiPage>
  )
}
