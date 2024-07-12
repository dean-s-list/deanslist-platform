import { Comment } from '@deanslist-platform/sdk'
import { UserUiAvatar } from '@deanslist-platform/web-user-ui'
import { Box, Group, Stack, Text, TypographyStylesProvider } from '@mantine/core'
import { UiAnchor, UiTime } from '@pubkey-ui/core'
import { ReactNode } from 'react'

import classes from './comment-ui-comment.module.css'
import { CommentUiIconDelete } from './comment-ui-icon-delete'

export function CommentUiComment({
  comment,
  footer,
  action,
  deleteComment,
  to,
}: {
  comment: Comment
  footer?: ReactNode
  action?: ReactNode
  deleteComment?: (id: string) => Promise<boolean>
  to?: string | null
}) {
  if (!comment.author) return null
  return (
    <Box p="md" pb="xs">
      <Group justify="space-between">
        <UiAnchor to={to ?? undefined} underline="never">
          <Group gap="sm" align="start">
            <UserUiAvatar user={comment.author} />
            <Stack gap={0}>
              <Group gap="xs" align="center">
                <UiAnchor display="flex" to={comment.author.profileUrl} underline="never">
                  <Text span size="lg" fw={700}>
                    {comment.author.username}
                  </Text>
                </UiAnchor>
                <Text size="xs" c="dimmed">
                  {comment.createdAt ? <UiTime fz="xs" c="dimmed" date={new Date(comment.createdAt)} /> : null}
                </Text>
              </Group>
              <TypographyStylesProvider
                className={classes.body}
                styles={{
                  root: { margin: 0, padding: 0 },
                }}
              >
                <div className={classes.content} dangerouslySetInnerHTML={{ __html: comment.content ?? '' }} />
              </TypographyStylesProvider>
            </Stack>
          </Group>
        </UiAnchor>
        <Group>
          {action}
          {deleteComment ? <CommentUiIconDelete comment={comment} deleteComment={deleteComment} /> : null}
        </Group>
      </Group>
      {footer}
    </Box>
  )
}
