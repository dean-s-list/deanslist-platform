import type { Review } from '@deanslist-platform/sdk'
import { SimpleGrid } from '@mantine/core'
import { ReviewUiGridItem } from './review-ui-grid-item'

export function ReviewUiGrid({ reviews = [] }: { reviews: Review[] }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
      {reviews.map((review) => (
        <ReviewUiGridItem key={review.id} to={review.id} review={review} />
      ))}
    </SimpleGrid>
  )
}
