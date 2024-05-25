import { Project } from '@deanslist-platform/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type ProjectUiAvatarProps = UiAvatarProps & {
  project?: Project
}

export function ProjectUiAvatar({ project, ...props }: ProjectUiAvatarProps) {
  return <UiAvatar radius="sm" url={project?.avatarUrl ?? undefined} name={project?.name} {...props} />
}
