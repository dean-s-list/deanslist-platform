import type { User } from '@deanslist-platform/sdk'
import { CoreUiCard, CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { UiGroup } from '@pubkey-ui/core'
import { UserUiItem } from './user-ui-item'

export function UserUiGridItem({ user, to }: { user: User; to?: string }) {
  return (
    <CoreUiCard>
      <UiGroup>
        <UserUiItem user={user} to={to} />
        <CoreUiDebugModal data={user} />
      </UiGroup>
    </CoreUiCard>
  )
}
