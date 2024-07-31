import { Project, User } from '@deanslist-platform/sdk'
import { UserUiLink } from '@deanslist-platform/web-user-ui'
import { Group } from '@mantine/core'

export function ProjectUiManagers({ project }: { project: Project }) {
  const users = (project.managers ?? []).map((m) => m.user) as User[]

  return (
    <Group>
      {users.map((user) => {
        return <UserUiLink key={user.id} user={user} to={user?.profileUrl} />
      })}
    </Group>
  )
}
