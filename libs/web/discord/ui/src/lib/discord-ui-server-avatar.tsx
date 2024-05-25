import { DiscordServer, getRandomInt } from '@deanslist-platform/sdk'
import { Avatar } from '@mantine/core'
import { getColorByIndex, UiAnchor, UiAvatarProps } from '@pubkey-ui/core'

export type DiscordUiServerAvatarProps = UiAvatarProps & {
  server?: DiscordServer
  to?: string | null
}
export function DiscordUiServerAvatar({ server, to, ...props }: DiscordUiServerAvatarProps) {
  const { avatarUrl, name } = server ?? {}
  const firstLetter = name?.charAt(0) ?? '?'

  const avatar = avatarUrl?.length ? (
    <Avatar radius={100} src={avatarUrl} alt={`${name} avatar`} {...props} />
  ) : (
    <Avatar radius={100} color={getColorByIndex(getRandomInt(name ?? ''))} {...props}>
      {firstLetter?.toUpperCase()}
    </Avatar>
  )

  return <UiAnchor to={to ?? undefined}>{avatar}</UiAnchor>
}
