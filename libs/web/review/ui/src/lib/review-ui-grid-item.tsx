import type { Review } from '@deanslist-platform/sdk'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { Paper } from '@mantine/core'
import { UiGroup } from '@pubkey-ui/core'
import { ReviewUiItem } from './review-ui-item'

export function ReviewUiGridItem({ review, to }: { review: Review; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <ReviewUiItem review={review} to={to} />
        <CoreUiDebugModal data={review} />
      </UiGroup>
    </Paper>
  )
}
