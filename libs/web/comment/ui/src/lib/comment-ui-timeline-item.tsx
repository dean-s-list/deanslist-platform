import type { Comment, ReviewerCreateCommentInput } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { useState } from 'react'
import { CommentUiComment } from './comment-ui-comment'
import { ReviewerCommentUiForm } from './reviewer-comment-ui-form'

export function CommentUiTimelineItem({
  comment,
  createComment,
  deleteComment,
}: {
  comment: Comment
  createComment: (res: ReviewerCreateCommentInput) => Promise<boolean>
  deleteComment: (id: string) => Promise<boolean>
}) {
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  return (
    <UiStack key={comment.id}>
      <CommentUiComment comment={comment} deleteComment={deleteComment} />

      <UiStack ml="xl" pl="xl">
        {showReplies && comment.children?.length ? (
          <UiStack>
            {comment.children.map((child) => (
              <CommentUiComment key={child.id} comment={child} deleteComment={deleteComment} />
            ))}
          </UiStack>
        ) : null}

        {showReplyForm ? (
          <ReviewerCommentUiForm
            cancel={() => setShowReplyForm(false)}
            createComment={(res) => {
              return createComment({ ...res, parentId: comment?.id ?? undefined }).then((res) => {
                setShowReplyForm(false)
                return res
              })
            }}
          />
        ) : (
          <Group justify="flex-end">
            <Button
              disabled={comment.children?.length === 0}
              variant="light"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? 'Hide' : 'Show'} Replies
            </Button>
            <Button variant="light" onClick={() => setShowReplyForm(!showReplyForm)}>
              Reply
            </Button>
          </Group>
        )}
      </UiStack>
    </UiStack>
  )
}
