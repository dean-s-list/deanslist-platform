import { Comment, ReviewerCreateCommentInput } from '@deanslist-platform/sdk'
import { CoreUiDivider } from '@deanslist-platform/web-core-ui'
import { UiStack } from '@pubkey-ui/core'
import React from 'react'
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
          <CoreUiDivider />
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
