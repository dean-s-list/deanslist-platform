import { getEnumOptions, ProjectMember, ProjectRole } from '@deanslist-platform/sdk'
import { Select, SelectProps } from '@mantine/core'

export function ProjectMemberUiUpdateRole({
  item,
  update,
  ...props
}: Omit<SelectProps, 'data' | 'value' | 'onChange'> & {
  item: ProjectMember
  update: (projectMemberId: string, role: ProjectRole) => void
}) {
  return (
    <Select
      w={150}
      clearable={false}
      value={item.role}
      onChange={(role) => update(item.id, role as ProjectRole)}
      data={getEnumOptions(ProjectRole)}
      {...props}
    />
  )
}
