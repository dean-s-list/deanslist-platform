import { ProjectMember, User } from '@deanslist-platform/sdk'
import { CoreUiButton, CoreUiDivider } from '@deanslist-platform/web-core-ui'
import { UserUiItem, UserUiSearch } from '@deanslist-platform/web-user-ui'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'

export function ProjectUiAddMember({
  members,
  addUser,
  placeholder,
}: {
  placeholder?: string
  members: ProjectMember[]
  addUser: (userId: string) => Promise<boolean | null | undefined>
}) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const users = (members.map((m) => m.user) ?? []).filter(Boolean) as User[]

  return (
    <UiStack>
      <UiStack>
        <UserUiSearch users={users} label={null} select={setUser} placeholder={placeholder} />
      </UiStack>
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
    </UiStack>
  )
}
