import { UserStatus } from '@deanslist-platform/sdk'
import { Badge } from '@mantine/core'

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  [UserStatus.Active]: 'green',
  [UserStatus.Created]: 'blue',
  [UserStatus.Inactive]: 'gray',
}

export function UserUiStatusBadge({ status }: { status: UserStatus }) {
  return (
    <Badge color={USER_STATUS_COLORS[status]} variant="light">
      {status}
    </Badge>
  )
}
