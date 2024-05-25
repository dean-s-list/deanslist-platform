import { UserRole } from '@deanslist-platform/sdk'
import { Badge } from '@mantine/core'

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.Admin]: 'pink',
  [UserRole.User]: 'blue',
}

export function UserUiRoleBadge({ role }: { role: UserRole }) {
  return (
    <Badge color={USER_ROLE_COLORS[role]} variant="light">
      {role}
    </Badge>
  )
}
