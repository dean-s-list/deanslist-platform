import { CoreUiDebugModal, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useManagerFindManyReviewByProject } from '@deanslist-platform/web-review-data-access'
import { ReviewerReviewProjectUiTable } from '@deanslist-platform/web-review-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function ManagerProjectReviewListFeature({ projectId }: { projectId: string }) {
  const { items, query, setSearch } = useManagerFindManyReviewByProject({
    projectId,
  })

  return (
    <UiStack>
      <Group>
        <CoreUiSearchField placeholder="Search review" setSearch={setSearch} />
        <CoreUiDebugModal data={items} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <ReviewerReviewProjectUiTable reviews={items} />
      ) : (
        <UiInfo message="No reviews found" />
      )}
    </UiStack>
  )
}
