import { User } from '@deanslist-platform/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type UserUiAvatarProps = UiAvatarProps & {
  user?: User
}

export function UserUiAvatar({ user, ...props }: UserUiAvatarProps) {
  return <UiAvatar variant="filled" url={user?.avatarUrl} name={user?.username ?? undefined} {...props} />
}
