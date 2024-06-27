import { Comment } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { UserUiItem } from '@deanslist-platform/web-user-ui'
import { Group, Text } from '@mantine/core'
import { UiGroup, UiStack, UiTime } from '@pubkey-ui/core'
import { CommentUiIconDelete } from './comment-ui-icon-delete'

export function CommentUiItem({
  comment,
  deleteComment,
}: {
  comment?: Comment
  deleteComment: (id: string) => Promise<boolean>
}) {
  const { user } = useAuth()
  if (!comment) return null

  return (
    <UiStack>
      <UiGroup>
        {comment.author ? <UserUiItem user={comment.author} /> : <div />}
        <Group>
          {comment.createdAt ? <UiTime c="dimmed" size="sm" date={new Date(comment.createdAt)} /> : null}
          <CoreUiDebugModal data={comment} />
          {user?.id === comment.authorId ? (
            <CommentUiIconDelete comment={comment} deleteComment={deleteComment} />
          ) : null}
        </Group>
      </UiGroup>

      <Group ml="xl" pl="md">
        <Text>{comment?.content}</Text>
      </Group>
    </UiStack>
  )
}
