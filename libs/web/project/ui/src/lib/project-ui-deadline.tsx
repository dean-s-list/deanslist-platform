import { Project } from '@deanslist-platform/sdk'
import { Group, Text } from '@mantine/core'
import { IconCalendar } from '@tabler/icons-react'

function getRemainingDays(date: Date): number {
  const difference = new Date(date).getTime() - new Date().getTime()

  if (difference < 0) {
    return 0
  }

  return Math.floor(difference / (1000 * 60 * 60 * 24))
}

export function ProjectUiDeadline({ project }: { project: Project }) {
  const days = project.endDate ? getRemainingDays(project.endDate) : 0

  return (
    <Group gap={5}>
      <IconCalendar size={16} />
      <Text>{days} days left</Text>
    </Group>
  )
}
