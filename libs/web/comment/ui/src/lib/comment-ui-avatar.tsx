import { Comment } from '@deanslist-platform/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type CommentUiAvatarProps = UiAvatarProps & {
  comment?: Comment
}

export function CommentUiAvatar({ comment, ...props }: CommentUiAvatarProps) {
  return <UiAvatar url={comment?.author?.avatarUrl ?? undefined} name={comment?.content} {...props} />
}
