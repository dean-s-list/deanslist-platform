import { Project } from '@deanslist-platform/sdk'
import { UserUiLink } from '@deanslist-platform/web-user-ui'
import { Group } from '@mantine/core'

export function ProjectUiManagers({ project }: { project: Project }) {
  return (
    <Group>
      {project.managers?.map((manager) => {
        return <UserUiLink key={manager.id} user={manager} to={manager.profileUrl} />
      })}
    </Group>
  )
}
