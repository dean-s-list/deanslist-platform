import { CoreUiCard, CoreUiDebugModal, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useReviewerFindManyReviewByUsername } from '@deanslist-platform/web-review-data-access'
import { ReviewerReviewUsernameUiTable } from '@deanslist-platform/web-review-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader, UiPage, UiStack } from '@pubkey-ui/core'
import { IconCheckupList } from '@tabler/icons-react'

export function ReviewerUsernameReviewListFeature({ username }: { username: string }) {
  const { items, query, setSearch } = useReviewerFindManyReviewByUsername({
    username,
  })

  return (
    <UiPage
      title={`Reviews for ${username}`}
      leftAction={<IconCheckupList size={28} />}
      rightAction={
        <Group>
          <CoreUiDebugModal data={items} />
        </Group>
      }
    >
      <UiStack>
        <Group>
          <CoreUiSearchField placeholder="Search review" setSearch={setSearch} />
          <CoreUiDebugModal data={items} />
        </Group>

        {query.isLoading ? (
          <UiLoader />
        ) : items?.length ? (
          <CoreUiCard>
            <ReviewerReviewUsernameUiTable reviews={items} />
          </CoreUiCard>
        ) : (
          <UiInfo message="No reviews found" />
        )}
      </UiStack>
    </UiPage>
  )
}
