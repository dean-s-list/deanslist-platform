import { formatDate, Project } from '@deanslist-platform/sdk'
import { Group, Text, Tooltip } from '@mantine/core'
import { IconCalendar } from '@tabler/icons-react'

export function ProjectUiDeadline({ project }: { project: Project }) {
  return (
    <Group gap={6}>
      <IconCalendar size={16} />
      <Tooltip
        label={`
         ${project.startDate ? formatDate(project.startDate) : 'N/A'} -
         ${project.endDate ? formatDate(project.endDate) : 'N/A'}`}
      >
        <Text size="sm" fw={400}>
          {project.remainingDays ?? 0} day{project.remainingDays !== 1 ? 's' : ''} left
        </Text>
      </Tooltip>
    </Group>
  )
}
