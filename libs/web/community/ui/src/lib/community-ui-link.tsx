import { Community } from '@deanslist-platform/sdk'
import { AvatarProps, Group, type GroupProps, Text } from '@mantine/core'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { CommunityUiAvatar } from './community-ui-avatar'

export function CommunityUiLink({
  anchorProps,
  avatarProps,
  groupProps,
  prefix,
  community,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  prefix?: string
  community?: Community
  to?: string | null
}) {
  if (!community) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="xs" {...groupProps}>
        {prefix ? (
          <Text size="md" c="dimmed">
            {prefix}
          </Text>
        ) : null}
        <CommunityUiAvatar size="sm" community={community} {...avatarProps} />
        <Text size="md">{community?.name}</Text>
      </Group>
    </UiAnchor>
  )
}
