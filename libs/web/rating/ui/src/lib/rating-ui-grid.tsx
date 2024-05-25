import type { Rating } from '@deanslist-platform/sdk'
import { SimpleGrid } from '@mantine/core'
import { RatingUiGridItem } from './rating-ui-grid-item'

export function RatingUiGrid({ ratings = [] }: { ratings: Rating[] }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
      {ratings.map((rating) => (
        <RatingUiGridItem key={rating.id} to={rating.id} rating={rating} />
      ))}
    </SimpleGrid>
  )
}
