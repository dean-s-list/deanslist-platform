import type { User } from '@deanslist-platform/sdk'
import { UserUiItem, UserUiSearch } from '@deanslist-platform/web-user-ui'
import { UnstyledButton } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { useState } from 'react'
import { ProjectUiMemberTable } from './project-ui-member-table'

export function ProjectUiMemberManager({
  users,
  addUser,
  removeUser,
}: {
  users: User[]
  addUser: (managerUserId: string) => Promise<boolean | null | undefined>
  removeUser: (managerUserId: string) => Promise<boolean | null | undefined>
}) {
  const [user, setUser] = useState<User | undefined>(undefined)

  return (
    <UiStack>
      <ProjectUiMemberTable users={users} delete={removeUser} />
      <UserUiSearch label={null} select={setUser} />
      {user ? (
        <UnstyledButton
          onClick={() => {
            console.log(user)
            addUser(user.id)
          }}
        >
          <UserUiItem user={user} />
        </UnstyledButton>
      ) : null}
    </UiStack>
  )
}
