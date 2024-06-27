import { Community } from '@deanslist-platform/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type CommunityUiAvatarProps = UiAvatarProps & {
  community?: Community
}

export function CommunityUiAvatar({ community, ...props }: CommunityUiAvatarProps) {
  return <UiAvatar url={community?.avatarUrl ?? undefined} name={community?.name ?? '?'} radius="md" {...props} />
}
