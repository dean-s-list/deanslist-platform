import { Project, ProjectStatus } from '@deanslist-platform/sdk'
import { UserUiLink } from '@deanslist-platform/web-user-ui'
import { Badge, BadgeProps, Group, MantineColor } from '@mantine/core'

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, MantineColor> = {
  [ProjectStatus.Active]: 'green',
  [ProjectStatus.Draft]: 'yellow',
  [ProjectStatus.Inactive]: 'gray',
}

export function ProjectUiManagers({ project }: { project: Project }) {
  return (
    <Group>
      {project.managers?.map((manager) => {
        return <UserUiLink key={manager.id} user={manager} to={manager.profileUrl} />
      })}
    </Group>
  )
}

export function ProjectUiStatusBadge({ status, ...props }: BadgeProps & { status?: ProjectStatus | null }) {
  if (!status) return null
  return (
    <Badge color={PROJECT_STATUS_COLORS[status]} variant="light" {...props}>
      {status}
    </Badge>
  )
}
