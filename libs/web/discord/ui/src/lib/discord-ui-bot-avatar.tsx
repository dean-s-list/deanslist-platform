import { DiscordBot, getRandomInt } from '@deanslist-platform/sdk'
import { Avatar, Indicator } from '@mantine/core'
import { getColorByIndex, UiAnchor, UiAvatarProps } from '@pubkey-ui/core'

export type DiscordUiBotAvatarProps = UiAvatarProps & {
  bot?: DiscordBot
  to?: string | null
}

export function DiscordUiBotAvatar({ bot, to, ...props }: DiscordUiBotAvatarProps) {
  const { avatarUrl, username } = bot ?? {}
  const firstLetter = username?.charAt(0) ?? '?'

  const avatar = avatarUrl?.length ? (
    <Avatar radius={100} src={avatarUrl} alt={`${username} avatar`} {...props} />
  ) : (
    <Avatar radius={100} color={getColorByIndex(getRandomInt(username ?? ''))} {...props}>
      {firstLetter?.toUpperCase()}
    </Avatar>
  )
  const color = bot?.id ? 'green' : 'gray'

  return (
    <UiAnchor to={to ?? undefined}>
      <Indicator offset={4} color={color}>
        {avatar}
      </Indicator>
    </UiAnchor>
  )
}
