import { ProjectStatus } from '@deanslist-platform/sdk'
import { Badge, BadgeProps, MantineColor } from '@mantine/core'

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, MantineColor> = {
  [ProjectStatus.Active]: 'green',
  [ProjectStatus.Draft]: 'yellow',
  [ProjectStatus.Inactive]: 'gray',
}

export function ProjectUiStatusBadge({ status, ...props }: BadgeProps & { status?: ProjectStatus | null }) {
  if (!status) return null
  return (
    <Badge color={PROJECT_STATUS_COLORS[status]} variant="light" {...props}>
      {status}
    </Badge>
  )
}
