import { CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useReviewerFindManyReviewByUsername } from '@deanslist-platform/web-review-data-access'
import { ReviewerReviewUsernameUiTable } from '@deanslist-platform/web-review-ui'
import { Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiPage, UiStack } from '@pubkey-ui/core'

export function ReviewerUsernameReviewListFeature({ username }: { username: string }) {
  const { items, query, setSearch } = useReviewerFindManyReviewByUsername({
    username,
  })

  return (
    <UiPage
      title={`Reviews for ${username}`}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
        </Group>
      }
    >
      <UiStack>
        <Group>
          <CoreUiSearchField placeholder="Search review" setSearch={setSearch} />
          <UiDebugModal data={items} />
        </Group>

        {query.isLoading ? (
          <UiLoader />
        ) : items?.length ? (
          <ReviewerReviewUsernameUiTable reviews={items} />
        ) : (
          <UiInfo message="No reviews found" />
        )}
      </UiStack>
    </UiPage>
  )
}
