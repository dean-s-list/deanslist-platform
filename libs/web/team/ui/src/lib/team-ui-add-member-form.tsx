import type { User } from '@deanslist-platform/sdk'
import { UserUiItem, UserUiSearch } from '@deanslist-platform/web-user-ui'
import { Button } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

export function TeamUiAddMemberForm({ addMember }: { addMember: (userId: string) => Promise<void> }) {
  const [userResult, setUserResult] = useState<User | undefined>(undefined)
  return (
    <UiStack>
      <UserUiSearch select={setUserResult} description="Search for a user to add to the team. " />
      {userResult ? (
        <UiGroup>
          <UserUiItem user={userResult} />
          <Button onClick={() => addMember(userResult.id)}>Add</Button>
        </UiGroup>
      ) : null}
    </UiStack>
  )
}
