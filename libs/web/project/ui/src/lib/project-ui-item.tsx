import { Project } from '@deanslist-platform/sdk'
import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ProjectUiAvatar } from './project-ui-avatar'
import { ProjectUiStatusBadge } from './project-ui-status-badge'

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
        <ProjectUiAvatar size="lg" project={project} {...avatarProps} />
        <Stack gap={2}>
          <Text size="xl" fw={500}>
            {project?.name}
          </Text>
          <ProjectUiStatusBadge status={project?.status} />
        </Stack>
      </Group>
    </UiAnchor>
  )
}
