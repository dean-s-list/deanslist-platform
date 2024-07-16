import { Project } from '@deanslist-platform/sdk'
import { Group, Text } from '@mantine/core'
import { IconCalendar } from '@tabler/icons-react'

export function ProjectUiDeadline({ project }: { project: Project }) {
  // TODO: Add deadline on project object
  return (
    <Group gap={5}>
      <IconCalendar size={16} />
      <Text>10 days left</Text>
    </Group>
  )
}
