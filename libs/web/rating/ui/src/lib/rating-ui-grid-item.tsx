import type { Rating } from '@deanslist-platform/sdk'
import { Paper } from '@mantine/core'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { RatingUiItem } from './rating-ui-item'

export function RatingUiGridItem({ rating, to }: { rating: Rating; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <RatingUiItem rating={rating} to={to} />
        <UiDebugModal data={rating} />
      </UiGroup>
    </Paper>
  )
}
