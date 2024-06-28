import { Comment, ReviewerCreateCommentInput } from '@deanslist-platform/sdk'
import { UiStack } from '@pubkey-ui/core'
import { CommentUiTimelineItem } from './comment-ui-timeline-item'

export function CommentUiTimeline({
  comments = [],
  createComment,
  deleteComment,
}: {
  comments: Comment[]
  createComment: (res: ReviewerCreateCommentInput) => Promise<boolean>
  deleteComment: (id: string) => Promise<boolean>
}) {
  return (
    <UiStack>
      {comments.map((comment) => (
        <CommentUiTimelineItem
          key={comment.id}
          comment={comment}
          deleteComment={deleteComment}
          createComment={createComment}
        />
      ))}
    </UiStack>
  )
}
