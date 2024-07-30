import type { User } from '@deanslist-platform/sdk'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { Paper } from '@mantine/core'
import { UiGroup } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'
import { UserUiItem } from './user-ui-item'

export function UserUiGridItem({ user, to }: { user: User; to: string }) {
  return (
    <Paper component={Link} to={to} withBorder bg="transparent" radius="md" p="sm">
      <UiGroup>
        <UserUiItem user={user} />
        <CoreUiDebugModal data={user} />
      </UiGroup>
    </Paper>
  )
}
