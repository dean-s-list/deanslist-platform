import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiDashboardGrid } from '@deanslist-platform/web-core-ui'
import { UiContainer, UiDashboardItem } from '@pubkey-ui/core'

export default function DashboardFeature({ links }: { links: UiDashboardItem[] }) {
  const { user } = useAuth()

  if (!user) return null

  return (
    <UiContainer>
      <CoreUiDashboardGrid links={links} />
    </UiContainer>
  )
}
