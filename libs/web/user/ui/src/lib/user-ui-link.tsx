import { User } from '@deanslist-platform/sdk'
import { AvatarProps, Group, type GroupProps, Text } from '@mantine/core'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { UserUiAvatar } from './user-ui-avatar'

export function UserUiLink({
  anchorProps,
  avatarProps,
  groupProps,
  prefix,
  user,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  prefix?: string
  user?: User
  to?: string | null
}) {
  if (!user) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="xs" {...groupProps}>
        {prefix ? (
          <Text size="md" c="dimmed">
            {prefix}
          </Text>
        ) : null}
        <UserUiAvatar size="sm" user={user} {...avatarProps} />
        <Text size="md">{user?.username}</Text>
      </Group>
    </UiAnchor>
  )
}
