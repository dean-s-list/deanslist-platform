import { Project } from '@deanslist-platform/sdk'
import { Group, Text } from '@mantine/core'
import { IconCalendar } from '@tabler/icons-react'

export function ProjectUiDeadline({ project }: { project: Project }) {
  return (
    <Group gap={6}>
      <IconCalendar size={16} />
      <Text size="sm" fw={400}>
        {project.remainingDays ?? 0} days left
      </Text>
    </Group>
  )
}
