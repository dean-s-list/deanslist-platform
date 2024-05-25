import { DiscordServer } from '@deanslist-platform/sdk'
import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { IconBrandDiscord } from '@tabler/icons-react'
import { ReactNode } from 'react'

import { DiscordUiServerAvatar } from './discord-ui-server-avatar'

export function DiscordUiServerItem({
  anchorProps,
  avatarProps,
  groupProps,
  server,
  children,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  server?: DiscordServer
  children?: ReactNode
  to?: string | null
}) {
  if (!server) return null

  return (
    <Group gap="sm" {...groupProps}>
      <DiscordUiServerAvatar server={server} to={to ?? undefined} {...avatarProps} />
      <Stack gap={1}>
        <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
          <Text size="lx" fw="bold">
            {server?.name}
          </Text>
        </UiAnchor>
        {children ? (
          children
        ) : (
          <Text size="sm" c="dimmed" span>
            <Group gap={4}>
              <IconBrandDiscord size={16} />
              Discord Server
            </Group>
          </Text>
        )}
      </Stack>
    </Group>
  )
}
