import { User } from '@deanslist-platform/sdk'
import { AvatarProps, Group, type GroupProps, Stack, Text, TextProps } from '@mantine/core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { UserUiAvatar } from './user-ui-avatar'

export function UserUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  textProps,
  user,
  to,
  label,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  textProps?: TextProps
  user?: User
  to?: string | null
  label?: ReactNode
}) {
  if (!user) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" wrap="nowrap" {...groupProps}>
        <UserUiAvatar user={user} {...avatarProps} />
        <Stack gap={1}>
          <Text fw={500} {...textProps}>
            {user?.username}
          </Text>
          {label ? (
            label
          ) : user.name ? (
            <Text size="sm" c="dimmed">
              {user.name}
            </Text>
          ) : null}
        </Stack>
      </Group>
    </UiAnchor>
  )
}
