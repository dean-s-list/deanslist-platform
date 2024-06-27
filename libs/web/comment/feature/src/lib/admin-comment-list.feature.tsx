import { useAdminFindManyComment } from '@deanslist-platform/web-comment-data-access'
import { AdminCommentUiTable } from '@deanslist-platform/web-comment-ui'
import { CoreUiDebugModal, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminCommentListFeature({ reviewId }: { reviewId: string }) {
  const { deleteComment, items, query, setSearch } = useAdminFindManyComment({
    reviewId,
  })

  return (
    <UiStack>
      <Group>
        <CoreUiSearchField placeholder="Search comment" setSearch={setSearch} />
        <CoreUiDebugModal data={items} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminCommentUiTable
          deleteComment={(comment) => {
            if (!window.confirm('Are you sure?')) return
            return deleteComment(comment.id)
          }}
          comments={items}
        />
      ) : (
        <UiInfo message="No comments found" />
      )}
    </UiStack>
  )
}
