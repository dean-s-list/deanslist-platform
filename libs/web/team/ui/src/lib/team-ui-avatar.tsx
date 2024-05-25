import { Team } from '@deanslist-platform/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type TeamUiAvatarProps = UiAvatarProps & {
  team?: Team
}

export function TeamUiAvatar({ team, ...props }: TeamUiAvatarProps) {
  return <UiAvatar url={team?.avatarUrl ?? undefined} name={team?.name ?? '?'} {...props} />
}
