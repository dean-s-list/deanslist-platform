import type { Comment, ReviewerCreateCommentInput } from '@deanslist-platform/sdk'
import { CoreUiDivider } from '@deanslist-platform/web-core-ui'
import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiInfoTable, UiStack } from '@pubkey-ui/core'
import { IconArrowsMaximize, IconArrowsMinimize, IconInfoCircle, IconMessageCircle2Filled } from '@tabler/icons-react'
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
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  return (
    <UiStack key={comment.id} gap={0}>
      <CommentUiComment comment={comment} deleteComment={deleteComment} />

      <UiStack gap="xs">
        {showReplyForm ? (
          <UiStack ml="xl" pl="xl">
            <ReviewerCommentUiForm
              placeholder="Write your reply here..."
              cancel={() => setShowReplyForm(false)}
              createComment={async (res) => {
                return createComment({ ...res, parentId: comment.id }).then((res) => {
                  setShowReplyForm(false)
                  return res
                })
              }}
            />
          </UiStack>
        ) : (
          <Group justify="flex-end" wrap="nowrap">
            <Button
              size="xs"
              radius="xl"
              rightSection={<IconInfoCircle size={16} />}
              variant="light"
              onClick={() =>
                modals.open({
                  size: 'lg',
                  centered: true,
                  title: 'Comment Details',
                  children: (
                    <UiInfoTable
                      items={[
                        ['Browser version', comment.versionBrowser ?? 'Unknown'],
                        ['OS version', comment.versionOs ?? 'Unknown'],
                      ]}
                    />
                  ),
                })
              }
            >
              Details
            </Button>
            <Button
              size="xs"
              radius="xl"
              rightSection={showReplies ? <IconArrowsMinimize size={16} /> : <IconArrowsMaximize size={16} />}
              disabled={comment.children?.length === 0}
              variant="light"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? 'Collapse' : 'Expand'} {comment.children?.length ?? 0} Replies
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
                <UiStack ml="xl" pl="xl">
                  <CoreUiDivider />
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
