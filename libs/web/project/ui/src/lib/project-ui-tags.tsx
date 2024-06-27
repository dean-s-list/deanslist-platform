import { Badge, Group } from '@mantine/core'

export function ProjectUiTags({ tags }: { tags?: string[] | null }) {
  if (!tags) return null
  return (
    <Group gap="xs">
      {tags?.map((tag) => (
        <Badge variant="light" key={tag}>
          {tag}
        </Badge>
      ))}
    </Group>
  )
}
