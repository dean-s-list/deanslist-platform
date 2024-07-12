import { Comment, ReviewerCreateCommentInput } from '@deanslist-platform/sdk'
import { Divider } from '@mantine/core'
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
        <UiStack key={comment.id}>
          <Divider />
          <CommentUiTimelineItem
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
            createComment={createComment}
          />
        </UiStack>
      ))}
    </UiStack>
  )
}
