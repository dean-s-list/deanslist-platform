import { Project } from '@deanslist-platform/sdk'
import { Group, Text } from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'

export function ProjectUiParticipants({ project }: { project: Project }) {
  return (
    <Group gap={5}>
      <IconUsers size={16} />
      <Text>{project.reviewCount ?? 0} participants</Text>
    </Group>
  )
}
