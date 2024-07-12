import { User } from '@deanslist-platform/sdk'
import { CoreUiCard } from '@deanslist-platform/web-core-ui'
import { Group, PaperProps, Text } from '@mantine/core'

import { ReactNode } from 'react'
import { UserUiAvatar } from './user-ui-avatar'

export function UserUiProfile({
  action,
  user,
  ...props
}: PaperProps & {
  action?: ReactNode
  user?: User
}) {
  if (!user) return null
  return (
    <CoreUiCard {...props}>
      <UserUiAvatar user={user} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {user.username}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {user.name}
      </Text>
      {action ? (
        <Group justify="center" mt="sm">
          {action}
        </Group>
      ) : null}
    </CoreUiCard>
  )
}
