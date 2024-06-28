import { Comment } from '@deanslist-platform/sdk'
import { UserUiItem } from '@deanslist-platform/web-user-ui'
import { Group, Paper, PaperProps, TypographyStylesProvider } from '@mantine/core'
import { UiTime } from '@pubkey-ui/core'
import { ReactNode } from 'react'

import classes from './comment-ui-comment.module.css'
import { CommentUiIconDelete } from './comment-ui-icon-delete'

export function CommentUiComment({
  comment,
  footer,
  action,
  deleteComment,
  to,
  ...props
}: PaperProps & {
  comment: Comment
  footer?: ReactNode
  action?: ReactNode
  deleteComment?: (id: string) => Promise<boolean>
  to?: string | null
}) {
  return (
    <Paper withBorder radius="md" p="md" pb="xs" {...props}>
      <Group justify="space-between">
        <UserUiItem
          to={to}
          user={comment.author ?? undefined}
          label={comment.createdAt ? <UiTime fz="xs" c="dimmed" date={new Date(comment.createdAt)} /> : null}
        />
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
