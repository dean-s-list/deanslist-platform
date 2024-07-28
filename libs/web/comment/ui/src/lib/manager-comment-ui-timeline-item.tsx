import { Comment, ManagerCreateRatingInput, ManagerUpdateRatingInput } from '@deanslist-platform/sdk'
import { CoreUiDivider } from '@deanslist-platform/web-core-ui'
import { ActionIcon, Button, Group, Rating as MantineRating } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { IconArrowsMaximize, IconArrowsMinimize, IconExternalLink } from '@tabler/icons-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CommentUiComment } from './comment-ui-comment'
import { CommentUiDetailsPopover } from './comment-ui-details-popover'
import { ManagerCommentUiRating } from './manager-comment-ui-rating'

export function ManagerCommentUiTimelineItem({
  comment,
  createRating,
  deleteRating,
  updateRating,
}: {
  comment: Comment
  createRating: (res: ManagerCreateRatingInput) => Promise<boolean>
  deleteRating: (ratingId: string) => Promise<boolean>
  updateRating: (ratingId: string, res: ManagerUpdateRatingInput) => Promise<boolean>
}) {
  const [showReplies, setShowReplies] = useState(false)

  return (
    <UiStack key={comment.id}>
      <UiStack key={comment.id} gap="xs">
        <CommentUiComment
          comment={comment}
          action={
            <Group>
              <MantineRating fractions={2} size="sm" readOnly value={comment.ratingAverage ?? 0} />
              {comment?.review?.viewUrl ? (
                <ActionIcon variant="light" size="sm" component={Link} to={comment.review.viewUrl}>
                  <IconExternalLink size={16} />
                </ActionIcon>
              ) : null}
            </Group>
          }
        />

        <UiStack gap="xs">
          <Group justify="flex-end" wrap="nowrap">
            <CommentUiDetailsPopover comment={comment} />
            <Button
              size="xs"
              radius="xl"
              rightSection={showReplies ? <IconArrowsMinimize size={16} /> : <IconArrowsMaximize size={16} />}
              disabled={comment.children?.length === 0}
              variant="light"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? 'Collapse' : 'Expand'} replies{' '}
              {comment.children?.length ? `(${comment.children.length})` : ''}
            </Button>
          </Group>
          {showReplies && comment.children?.length ? (
            <UiStack>
              {comment.children.map((child) => (
                <UiStack key={child.id}>
                  <UiStack ml="xl" pl="xl">
                    <CoreUiDivider />
                    <CommentUiComment key={child.id} comment={child} />
                  </UiStack>
                </UiStack>
              ))}
            </UiStack>
          ) : null}
        </UiStack>
      </UiStack>
      <ManagerCommentUiRating comment={comment} create={createRating} delete={deleteRating} update={updateRating} />
    </UiStack>
  )
}
