import type { Comment, ReviewerCreateCommentInput } from '@deanslist-platform/sdk'
import { Button, Divider, Group } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { IconArrowsMaximize, IconArrowsMinimize, IconMessageCircle2Filled } from '@tabler/icons-react'
import React, { useState } from 'react'
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
  const [showReplies, setShowReplies] = useState(true)
  const [showReplyForm, setShowReplyForm] = useState(false)
  return (
    <UiStack key={comment.id}>
      <CommentUiComment comment={comment} deleteComment={deleteComment} />

      <UiStack>
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
              size="xs"
              radius="xl"
              rightSection={showReplies ? <IconArrowsMinimize size={16} /> : <IconArrowsMaximize size={16} />}
              disabled={comment.children?.length === 0}
              variant="light"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? 'Collapse' : 'Expand'} Replies
            </Button>
            <Button
              size="xs"
              rightSection={<IconMessageCircle2Filled size={16} />}
              radius="xl"
              variant="light"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              Reply
            </Button>
          </Group>
        )}
        {showReplies && comment.children?.length ? (
          <UiStack>
            {comment.children.map((child) => (
              <UiStack key={child.id}>
                <Divider />
                <UiStack ml="xl" pl="xl">
                  <CommentUiComment key={child.id} comment={child} deleteComment={deleteComment} />
                </UiStack>
              </UiStack>
            ))}
          </UiStack>
        ) : null}
      </UiStack>
    </UiStack>
  )
}
