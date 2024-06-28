import { Project } from '@deanslist-platform/sdk'
import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { ProjectUiAvatar } from './project-ui-avatar'

export function ProjectUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  label,
  project,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  label?: ReactNode
  project?: Project
  to?: string | null
}) {
  if (!project) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <ProjectUiAvatar size="md" project={project} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {project?.name}
          </Text>
          {label}
        </Stack>
      </Group>
    </UiAnchor>
  )
}
