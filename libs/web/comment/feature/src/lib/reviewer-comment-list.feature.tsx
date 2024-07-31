import { Review } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { useReviewerFindManyComment } from '@deanslist-platform/web-comment-data-access'
import { CommentUiFormButtons, CommentUiTimeline } from '@deanslist-platform/web-comment-ui'
import { CoreUiDebugModal, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { Group } from '@mantine/core'
import { UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function ReviewerCommentListFeature({ review, leftAction }: { review: Review; leftAction: ReactNode }) {
  const { user } = useAuth()
  const { createComment, deleteComment, items, query, setSearch } = useReviewerFindManyComment({
    reviewId: review.id,
  })
  const owned = user?.id === review.projectMember?.userId

  return (
    <UiStack>
      <UiGroup>
        <Group>{leftAction}</Group>
        <Group>
          <CoreUiSearchField size="sm" w={100} placeholder="Search" setSearch={setSearch} />
          <CoreUiDebugModal data={items} />
        </Group>
      </UiGroup>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UiStack>
          {owned ? <CommentUiFormButtons createComment={createComment} /> : null}
          <CommentUiTimeline deleteComment={deleteComment} createComment={createComment} comments={items} />
        </UiStack>
      ) : owned ? (
        <CommentUiFormButtons createComment={createComment} open />
      ) : (
        <UiInfo message="No comments found" />
      )}
    </UiStack>
  )
}
