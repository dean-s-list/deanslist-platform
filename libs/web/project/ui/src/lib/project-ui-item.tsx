import { Project } from '@deanslist-platform/sdk'
import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ProjectUiAvatar } from './project-ui-avatar'

export function ProjectUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  project,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  project?: Project
  to?: string | null
}) {
  if (!project) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <ProjectUiAvatar project={project} {...avatarProps} />
        <Stack gap={0}>
          <Text size="lg">{project?.name}</Text>
          <Text size="xs" c="dimmed">
            Project
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
