import { CoreUiDebugModal, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { ProjectUiUserReviewButton } from '@deanslist-platform/web-project-ui'
import {
  useReviewerFindManyReviewByProject,
  useReviewerFindUserProjectReview,
} from '@deanslist-platform/web-review-data-access'
import { ReviewerReviewProjectUiTable, ReviewUiEmptyState } from '@deanslist-platform/web-review-ui'
import { Group } from '@mantine/core'
import { UiLoader, UiStack } from '@pubkey-ui/core'

export function ReviewerProjectReviewListFeature({ projectId }: { projectId: string }) {
  const { item } = useReviewerFindUserProjectReview({ projectId })
  const { items, createReview, query, setSearch } = useReviewerFindManyReviewByProject({
    projectId,
  })

  return (
    <UiStack>
      <Group>
        <CoreUiSearchField size="sm" placeholder="Search review" setSearch={setSearch} />
        <CoreUiDebugModal data={{ item, items }} />
        <ProjectUiUserReviewButton create={createReview} review={item} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <ReviewerReviewProjectUiTable reviews={items} />
      ) : (
        <ReviewUiEmptyState />
      )}
    </UiStack>
  )
}
