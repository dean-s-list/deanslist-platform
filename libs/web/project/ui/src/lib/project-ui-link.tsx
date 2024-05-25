import { Project } from '@deanslist-platform/sdk'
import { AvatarProps, Group, Text } from '@mantine/core'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { ProjectUiAvatar } from './project-ui-avatar'

export function ProjectUiLink({
  anchorProps,
  avatarProps,
  project,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  project?: Project
  to?: string | null
}) {
  if (!project) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="xs">
        <ProjectUiAvatar size="sm" project={project} {...avatarProps} />
        <Text size="lg">{project?.name}</Text>
      </Group>
    </UiAnchor>
  )
}
