import { User } from '@deanslist-platform/sdk'
import { useUserFindManyUser } from '@deanslist-platform/web-user-data-access'
import { UserUiAutocomplete, type UserUiAutocompleteProps } from './user-ui-autocomplete'

export interface UserUiSearchProps extends Omit<UserUiAutocompleteProps, 'items' | 'isLoading' | 'setSearch'> {
  users?: User[]
}

export function UserUiSearch({ select, users = [], placeholder = 'Search for a user', ...props }: UserUiSearchProps) {
  const { items, query, setSearch } = useUserFindManyUser({ limit: 5 })
  const userIds = users.map((user) => user.id)
  const filtered = items.filter((user) => !userIds.includes(user.id))

  return (
    <UserUiAutocomplete
      placeholder={placeholder}
      disabled={!filtered.length}
      isLoading={query.isLoading}
      select={select}
      items={filtered}
      setSearch={setSearch}
      {...props}
    />
  )
}
