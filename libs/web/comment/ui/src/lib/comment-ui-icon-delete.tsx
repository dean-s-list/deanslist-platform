import { Comment } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { ActionIcon, Tooltip } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

export function CommentUiIconDelete({
  comment,
  deleteComment,
}: {
  comment: Comment
  deleteComment: (id: string) => Promise<boolean>
}) {
  const { user } = useAuth()
  if (comment?.authorId !== user?.id) {
    return null
  }
  return (
    <Tooltip label="Delete comment">
      <ActionIcon
        color="red"
        variant="light"
        size="sm"
        onClick={() => {
          if (!window.confirm('Are you sure you want to delete this comment?')) {
            return
          }
          return deleteComment(comment.id)
        }}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
