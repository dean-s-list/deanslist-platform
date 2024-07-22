import { CoreUiCard, CoreUiDebugModal, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useReviewerFindManyReviewByUsername } from '@deanslist-platform/web-review-data-access'
import { ReviewerReviewUsernameUiTable, ReviewUiEmptyState } from '@deanslist-platform/web-review-ui'
import { Group } from '@mantine/core'
import { UiLoader, UiPage } from '@pubkey-ui/core'
import { IconCheckupList } from '@tabler/icons-react'

export function ReviewerUsernameReviewListFeature({ username }: { username: string }) {
  const { items, query, search, setSearch } = useReviewerFindManyReviewByUsername({
    username,
  })

  return (
    <UiPage
      title={`Reviews for ${username}`}
      leftAction={<IconCheckupList size={28} />}
      rightAction={
        <Group>
          <CoreUiDebugModal data={items} />
          <CoreUiSearchField
            miw={300}
            maw={500}
            size="md"
            placeholder="Search by project title or comment"
            setSearch={setSearch}
          />
        </Group>
      }
    >
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <CoreUiCard>
          <ReviewerReviewUsernameUiTable reviews={items} />
        </CoreUiCard>
      ) : (
        <ReviewUiEmptyState search={search} username={username} />
      )}
    </UiPage>
  )
}
