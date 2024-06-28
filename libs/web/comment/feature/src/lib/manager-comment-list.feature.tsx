import { useManagerFindManyComment } from '@deanslist-platform/web-comment-data-access'
import { ManagerCommentUiTimeline } from '@deanslist-platform/web-comment-ui'
import { CoreUiDebugModal, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useManagerRating } from '@deanslist-platform/web-rating-data-access'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function ManagerCommentListFeature({ projectId }: { projectId: string }) {
  const { items, query, setSearch } = useManagerFindManyComment({
    projectId,
  })

  const { createRating, deleteRating, updateRating } = useManagerRating()

  return (
    <UiStack>
      <Group>
        <CoreUiSearchField placeholder="Search comments" setSearch={setSearch} />
        <CoreUiDebugModal data={items} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <ManagerCommentUiTimeline
          comments={items}
          createRating={(input) =>
            createRating(input).then(async (res) => {
              await query.refetch()
              return res
            })
          }
          deleteRating={(ratingId) =>
            deleteRating(ratingId).then(async (res) => {
              await query.refetch()
              return res
            })
          }
          updateRating={(ratingId, input) =>
            updateRating(ratingId, input).then(async (res) => {
              await query.refetch()
              return res
            })
          }
        />
      ) : (
        <UiInfo message="No comments found" />
      )}
    </UiStack>
  )
}
