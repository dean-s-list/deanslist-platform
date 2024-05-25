import { CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useUserFindManyReview, useUserFindUserProjectReview } from '@deanslist-platform/web-review-data-access'
import { ReviewUiGrid } from '@deanslist-platform/web-review-ui'
import { Button, Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function UserReviewListFeature({ projectId }: { projectId: string }) {
  const { item } = useUserFindUserProjectReview({ projectId })
  const { items, createReview, query, setSearch } = useUserFindManyReview({
    projectId,
  })

  return (
    <UiStack>
      <Group>
        <CoreUiSearchField placeholder="Search review" setSearch={setSearch} />
        <UiDebugModal data={items} />
        {item ? (
          <Button component={Link} to={item.viewUrl}>
            Open your review
          </Button>
        ) : (
          <Button onClick={() => createReview()}>Start your review</Button>
        )}
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <ReviewUiGrid reviews={items} />
      ) : (
        <UiInfo message="No reviews found" />
      )}
    </UiStack>
  )
}
