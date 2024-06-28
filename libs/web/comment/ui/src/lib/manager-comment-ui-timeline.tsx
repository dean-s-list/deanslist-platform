import { Comment, ManagerCreateRatingInput, ManagerUpdateRatingInput } from '@deanslist-platform/sdk'
import { UiStack } from '@pubkey-ui/core'
import { ManagerCommentUiTimelineItem } from './manager-comment-ui-timeline-item'

export function ManagerCommentUiTimeline({
  comments = [],
  createRating,
  deleteRating,
  updateRating,
}: {
  comments: Comment[]
  createRating: (res: ManagerCreateRatingInput) => Promise<boolean>
  deleteRating: (ratingId: string) => Promise<boolean>
  updateRating: (ratingId: string, res: ManagerUpdateRatingInput) => Promise<boolean>
}) {
  return (
    <UiStack>
      {comments.map((comment) => (
        <ManagerCommentUiTimelineItem
          key={comment.id}
          comment={comment}
          createRating={createRating}
          deleteRating={deleteRating}
          updateRating={updateRating}
        />
      ))}
    </UiStack>
  )
}
