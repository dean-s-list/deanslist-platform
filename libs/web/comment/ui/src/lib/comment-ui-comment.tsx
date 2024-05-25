import { Comment } from '@deanslist-platform/sdk'
import { Avatar, Group, Paper, Text, TypographyStylesProvider } from '@mantine/core'
import { UiTime } from '@pubkey-ui/core'
import { ReactNode } from 'react'

import classes from './comment-ui-comment.module.css'
import { CommentUiIconDelete } from './comment-ui-icon-delete'

export function CommentUiComment({
  comment,
  footer,
  action,
  deleteComment,
}: {
  comment: Comment
  footer?: ReactNode
  action?: ReactNode
  deleteComment?: (id: string) => Promise<boolean>
}) {
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group justify="space-between">
        <Group>
          <Avatar src={comment.author?.avatarUrl || ''} alt={comment.author?.name || 'User'} radius="xl" />
          <div>
            <Text fz="sm">{comment.author?.name ?? comment.author?.username}</Text>
            {comment.createdAt ? <UiTime fz="xs" c="dimmed" date={new Date(comment.createdAt)} /> : null}
            {comment.updatedAt && comment.createdAt !== comment.updatedAt ? (
              <UiTime prefix="updated" fz="xs" c="dimmed" date={new Date(comment.updatedAt)} />
            ) : null}
          </div>
        </Group>
        <Group>
          {action}
          {deleteComment ? <CommentUiIconDelete comment={comment} deleteComment={deleteComment} /> : null}
        </Group>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: comment.content ?? '' }} />
      </TypographyStylesProvider>
      {footer}
    </Paper>
  )
}
