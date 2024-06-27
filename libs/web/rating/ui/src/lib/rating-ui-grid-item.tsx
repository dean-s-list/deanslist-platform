import type { Rating } from '@deanslist-platform/sdk'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { Paper } from '@mantine/core'
import { UiGroup } from '@pubkey-ui/core'
import { RatingUiItem } from './rating-ui-item'

export function RatingUiGridItem({ rating, to }: { rating: Rating; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <RatingUiItem rating={rating} to={to} />
        <CoreUiDebugModal data={rating} />
      </UiGroup>
    </Paper>
  )
}
