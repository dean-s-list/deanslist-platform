import type { User } from '@deanslist-platform/sdk'
import { CoreUiButton, CoreUiDivider } from '@deanslist-platform/web-core-ui'
import { UserUiItem, UserUiSearch } from '@deanslist-platform/web-user-ui'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { ProjectUiMemberTable } from './project-ui-member-table'

export function ProjectUiMemberManager({
  users,
  addUser,
  removeUser,
  max,
  placeholder,
}: {
  max?: number
  placeholder?: string
  users: User[]
  addUser: (managerUserId: string) => Promise<boolean | null | undefined>
  removeUser: (managerUserId: string) => Promise<boolean | null | undefined>
}) {
  const addMore = max ? users.length < max : true
  const [user, setUser] = useState<User | undefined>(undefined)

  return (
    <UiStack>
      {addMore ? (
        <UiStack>
          <UserUiSearch users={users} label={null} select={setUser} placeholder={placeholder} />
        </UiStack>
      ) : null}
      {user ? (
        <UiStack key={user.id}>
          <UiGroup px="xs">
            <UserUiItem user={user} />
            <CoreUiButton size="xs" outline iconLeft={IconPlus} onClick={() => addUser(user.id)}>
              Select user
            </CoreUiButton>
          </UiGroup>
          <CoreUiDivider />
        </UiStack>
      ) : null}
      <ProjectUiMemberTable users={users} delete={removeUser} />
    </UiStack>
  )
}
