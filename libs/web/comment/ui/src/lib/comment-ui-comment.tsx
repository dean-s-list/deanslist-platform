import { Comment } from '@deanslist-platform/sdk'
import { CoreUiContent, CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { UserUiAvatar } from '@deanslist-platform/web-user-ui'
import { Box, Group, Stack, Text } from '@mantine/core'
import { UiAnchor, UiTime } from '@pubkey-ui/core'
import { ReactNode } from 'react'
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
    <Box>
      <Group gap="xs" justify="space-between" wrap="nowrap" align="start">
        <UiAnchor to={to ?? undefined} underline="never">
          <Group gap="xs" align="start" wrap="nowrap">
            <UserUiAvatar size="sm" user={comment.author} />
            <Stack gap="xs">
              <Group gap="xs" align="center">
                <UiAnchor display="flex" to={to ? undefined : comment.author.profileUrl} underline="never">
                  <Text span fw={700}>
                    {comment.author.username}
                  </Text>
                </UiAnchor>
                {comment.createdAt ? <UiTime fz="xs" c="dimmed" date={new Date(comment.createdAt)} /> : null}
              </Group>
              <CoreUiContent content={comment.content ?? ''} />
            </Stack>
          </Group>
        </UiAnchor>
        <Group wrap="nowrap" gap="xs">
          {action}
          <CoreUiDebugModal data={comment} />
          {deleteComment ? <CommentUiIconDelete comment={comment} deleteComment={deleteComment} /> : null}
        </Group>
      </Group>
      {footer}
    </Box>
  )
}
