import { Comment, UserCreateCommentInput } from '@deanslist-platform/sdk'
import { Button, ButtonProps, Group } from '@mantine/core'
import { useState } from 'react'
import { UserCommentUiForm } from './user-comment-ui-form'

export function CommentUiFormButtons({
  label,
  comment,
  createComment,
  ...props
}: ButtonProps & {
  label: string
  comment?: Comment
  createComment: (res: UserCreateCommentInput) => Promise<boolean>
}) {
  const [showReply, setShowReply] = useState(false)

  return showReply ? (
    <UserCommentUiForm
      cancel={() => setShowReply(false)}
      createComment={(res) => {
        return createComment({ ...res, parentId: comment?.id ?? undefined }).then((res) => {
          setShowReply(false)
          return res
        })
      }}
    />
  ) : (
    <Group justify="flex-end">
      <Button {...props} onClick={() => setShowReply(!showReply)}>
        {label}
      </Button>
    </Group>
  )
}
