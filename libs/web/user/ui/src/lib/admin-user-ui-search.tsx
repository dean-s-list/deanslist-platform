import { useAdminFindManyUser } from '@deanslist-platform/web-user-data-access'
import { UserUiAutocomplete, type UserUiAutocompleteProps } from './user-ui-autocomplete'

export type AdminUserUiSearchProps = Omit<UserUiAutocompleteProps, 'items' | 'isLoading' | 'setSearch'>

export function AdminUserUiSearch({ select, ...props }: AdminUserUiSearchProps) {
  const { items, query, setSearch } = useAdminFindManyUser({ limit: 5 })

  return (
    <UserUiAutocomplete isLoading={query.isLoading} select={select} items={items} setSearch={setSearch} {...props} />
  )
}
