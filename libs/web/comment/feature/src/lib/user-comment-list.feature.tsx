import { useUserFindManyComment } from '@deanslist-platform/web-comment-data-access'
import { CommentUiFormButtons, CommentUiTimeline } from '@deanslist-platform/web-comment-ui'
import { CoreUiDebugModal, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function UserCommentListFeature({ reviewId }: { reviewId: string }) {
  const { createComment, deleteComment, items, query, setSearch } = useUserFindManyComment({
    reviewId,
  })

  return (
    <UiStack>
      <Group>
        <CoreUiSearchField placeholder="Search comments" setSearch={setSearch} />
        <CoreUiDebugModal data={items} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <CommentUiTimeline deleteComment={deleteComment} createComment={createComment} comments={items} />
      ) : (
        <UiInfo message="No comments found" />
      )}

      <CommentUiFormButtons label="Comment" createComment={createComment} />
    </UiStack>
  )
}
