import { Team } from '@deanslist-platform/sdk'
import { AvatarProps, Group, type GroupProps, Text } from '@mantine/core'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { TeamUiAvatar } from './team-ui-avatar'

export function TeamUiLink({
  anchorProps,
  avatarProps,
  groupProps,
  prefix,
  team,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  prefix?: string
  team?: Team
  to?: string | null
}) {
  if (!team) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="xs" {...groupProps}>
        {prefix ? (
          <Text size="md" c="dimmed">
            {prefix}
          </Text>
        ) : null}
        <TeamUiAvatar size="sm" team={team} {...avatarProps} />
        <Text size="md">{team?.name}</Text>
      </Group>
    </UiAnchor>
  )
}
