import { Comment } from '@deanslist-platform/sdk'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
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
    <Box p="xs" pb="xs">
      <Group gap="xs" justify="space-between" wrap="nowrap" align="start">
        <UiAnchor to={to ?? undefined} underline="never">
          <Group gap="xs" align="start" wrap="nowrap">
            <UserUiAvatar size="sm" user={comment.author} />
            <Stack gap="xs">
              <Group gap="xs" align="center">
                <UiAnchor display="flex" to={comment.author.profileUrl} underline="never">
                  <Text span fw={700}>
                    {comment.author.username}
                  </Text>
                </UiAnchor>
                {comment.createdAt ? <UiTime fz="xs" c="dimmed" date={new Date(comment.createdAt)} /> : null}
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
          <CoreUiDebugModal data={comment} />
          {deleteComment ? <CommentUiIconDelete comment={comment} deleteComment={deleteComment} /> : null}
        </Group>
      </Group>
      {footer}
    </Box>
  )
}
