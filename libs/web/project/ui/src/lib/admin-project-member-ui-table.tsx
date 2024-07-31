import { ProjectMember, ProjectRole } from '@deanslist-platform/sdk'
import { UserUiItem } from '@deanslist-platform/web-user-ui'
import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { UiDebugModal } from '@pubkey-ui/core'
import { IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { ProjectMemberUiUpdateRole } from './project-member-ui-update-role'

export function AdminProjectMemberUiTable({
  projectMembers = [],
  removeProjectMember,
  updateProjectMemberRole,
}: {
  projectMembers: ProjectMember[]
  removeProjectMember: (projectMemberId: string) => void
  updateProjectMemberRole: (projectMemberId: string, role: ProjectRole) => void
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          { accessor: 'user', render: (item) => (item.user ? <UserUiItem user={item.user} /> : null) },
          {
            accessor: 'role',
            width: 150,
            render: (item: ProjectMember) => <ProjectMemberUiUpdateRole item={item} update={updateProjectMemberRole} />,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            width: 100,
            render: (item) => (
              <Group gap="xs" justify="right">
                <UiDebugModal data={item} />
                <ActionIcon color="red" variant="light" size="sm" onClick={() => removeProjectMember(item.id)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={projectMembers}
      />
    </ScrollArea>
  )
}
