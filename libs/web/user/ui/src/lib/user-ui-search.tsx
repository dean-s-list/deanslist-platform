import { User } from '@deanslist-platform/sdk'
import { useUserFindManyUser } from '@deanslist-platform/web-user-data-access'
import { UserUiAutocomplete, type UserUiAutocompleteProps } from './user-ui-autocomplete'

export interface UserUiSearchProps extends Omit<UserUiAutocompleteProps, 'items' | 'isLoading' | 'setSearch'> {
  users?: User[]
}

export function UserUiSearch({ select, users = [], placeholder = 'Search for a user', ...props }: UserUiSearchProps) {
  const filterIds = (users ?? []).filter(Boolean).map((user) => user?.id)
  const { items, query, setSearch } = useUserFindManyUser({ limit: 5, filterIds })

  return (
    <UserUiAutocomplete
      placeholder={placeholder}
      isLoading={query.isLoading}
      select={select}
      items={items}
      setSearch={setSearch}
      {...props}
    />
  )
}
