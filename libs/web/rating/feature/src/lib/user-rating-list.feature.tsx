import { CoreUiBack, CoreUiDebugModal, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useUserFindManyRating } from '@deanslist-platform/web-rating-data-access'
import { RatingUiGrid } from '@deanslist-platform/web-rating-ui'
import { Button, Group } from '@mantine/core'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function UserRatingListFeature() {
  const { items, query, setSearch } = useUserFindManyRating()

  return (
    <UiPage
      title="Ratings"
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <CoreUiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <CoreUiSearchField placeholder="Search rating" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <RatingUiGrid ratings={items} />
      ) : (
        <UiInfo message="No ratings found" />
      )}
    </UiPage>
  )
}
