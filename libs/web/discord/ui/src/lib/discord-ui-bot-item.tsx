import { DiscordBot } from '@deanslist-platform/sdk'
import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { IconBrandDiscord } from '@tabler/icons-react'
import { DiscordUiBotAvatar } from './discord-ui-bot-avatar'

export function DiscordUiBotItem({
  anchorProps,
  avatarProps,
  groupProps,
  bot,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  bot?: DiscordBot
  to?: string | null
}) {
  if (!bot) return null

  return (
    <Group gap="sm" {...groupProps}>
      <DiscordUiBotAvatar bot={bot} to={to ?? undefined} {...avatarProps} />
      <Stack gap={1}>
        <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
          <Text size="lx" fw="bold">
            {bot?.username}
          </Text>
        </UiAnchor>
        <Text size="sm" c="dimmed" span>
          <Group gap={4}>
            <IconBrandDiscord size={16} />
            Discord Bot
          </Group>
        </Text>
      </Stack>
    </Group>
  )
}
