import { Project } from '@deanslist-platform/sdk'
import { Group, Text } from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'

export function ProjectUiParticipants({ project }: { project: Project }) {
  return (
    <Group gap={6}>
      <IconUsers size={16} />
      <Text size="sm" fw={400}>
        {project.reviewCount ?? 0} participants
      </Text>
    </Group>
  )
}
