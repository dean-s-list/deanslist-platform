import { Paper } from '@mantine/core'
import type { Review } from '@deanslist-platform/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { ReviewUiItem } from './review-ui-item'

export function ReviewUiGridItem({ review, to }: { review: Review; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <ReviewUiItem review={review} to={to} />
        <UiDebugModal data={review} />
      </UiGroup>
    </Paper>
  )
}
