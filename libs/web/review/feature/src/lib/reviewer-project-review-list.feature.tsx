import { CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import {
  useReviewerFindManyReviewByProject,
  useUserFindUserProjectReview,
} from '@deanslist-platform/web-review-data-access'
import { ReviewerReviewProjectUiTable } from '@deanslist-platform/web-review-ui'
import { Button, Group } from '@mantine/core'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link, useNavigate } from 'react-router-dom'

export function ReviewerProjectReviewListFeature({ projectId }: { projectId: string }) {
  const navigate = useNavigate()
  const { item } = useUserFindUserProjectReview({ projectId })
  const { items, createReview, query, setSearch } = useReviewerFindManyReviewByProject({
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
          <Button
            onClick={() =>
              createReview().then((res) => {
                if (!res) return
                console.log('created', res.id)
                navigate(`./${res.id}`)
              })
            }
          >
            Start your review
          </Button>
        )}
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
