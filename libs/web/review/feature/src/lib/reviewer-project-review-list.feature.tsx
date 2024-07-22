import { CoreUiDebugModal, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { ProjectUiUserReviewButton } from '@deanslist-platform/web-project-ui'
import {
  useReviewerFindManyReviewByProject,
  useUserFindUserProjectReview,
} from '@deanslist-platform/web-review-data-access'
import { ReviewerReviewProjectUiTable } from '@deanslist-platform/web-review-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function ReviewerProjectReviewListFeature({ projectId }: { projectId: string }) {
  const { item } = useUserFindUserProjectReview({ projectId })
  const { items, createReview, query, setSearch } = useReviewerFindManyReviewByProject({
    projectId,
  })

  return (
    <UiStack>
      <Group>
        <CoreUiSearchField size="sm" placeholder="Search review" setSearch={setSearch} />
        <CoreUiDebugModal data={items} />
        <ProjectUiUserReviewButton create={createReview} review={item} />
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
