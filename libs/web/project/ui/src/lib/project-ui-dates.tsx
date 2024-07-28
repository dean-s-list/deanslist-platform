import { formatDate, Project } from '@deanslist-platform/sdk'
import { Group, Text } from '@mantine/core'

export function ProjectUiDates({ project }: { project: Project }) {
  return (
    <Group gap="xs">
      <Text size="xs" fw={400} c="dimmed">
        {project.startDate ? formatDate(project.startDate) : null}
        {project.endDate ? ` to ${formatDate(project.endDate)}` : null}
      </Text>
    </Group>
  )
}
