import type { TeamMember } from '@deanslist-platform/sdk'
import { UserUiItem } from '@deanslist-platform/web-user-ui'
import { ActionIcon, Checkbox, Grid, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { UiCard, UiDebugModal, UiError, UiGroup, UiLoader, UiStack } from '@pubkey-ui/core'
import { IconTrash } from '@tabler/icons-react'
import { TeamUiAddMemberForm } from './team-ui-add-member-form'

export function TeamUiMemberListItem({
  item,
  toggle,
  remove,
}: {
  item: TeamMember
  toggle: () => Promise<void>
  remove: () => Promise<void>
}) {
  return (
    <UiCard key={item.id}>
      <UiStack>
        <UiGroup>
          {item.user ? <UserUiItem user={item.user} /> : <div />}

          <Group>
            <UiDebugModal data={item} />
            <ActionIcon
              size="sm"
              color="red"
              variant="light"
              onClick={() => {
                modals.openConfirmModal({
                  title: 'Remove Team Member',
                  children: `Are you sure you want to remove ${item.user?.name ?? item.user?.username} from the team?`,
                  labels: { confirm: 'Remove', cancel: 'Cancel' },
                  onConfirm: remove,
                })
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </UiGroup>
        <Checkbox
          label="Team Admin"
          description="Admins can manage team settings and members."
          checked={item.admin ?? false}
          onChange={toggle}
        />
      </UiStack>
    </UiCard>
  )
}

export function TeamUiMembersPage({
  isLoading,
  items,
  remove,
  toggle,
  add,
}: {
  isLoading: boolean
  items: TeamMember[]
  remove: (id: string) => Promise<void>
  toggle: (id: string) => Promise<void>
  add: (id: string) => Promise<void>
}) {
  return (
    <UiStack>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          {isLoading ? (
            <UiLoader />
          ) : items?.length ? (
            <UiStack>
              {items.map((item) => (
                <TeamUiMemberListItem
                  key={item.id}
                  item={item}
                  remove={() => remove(item.userId)}
                  toggle={() => toggle(item.userId)}
                />
              ))}
            </UiStack>
          ) : (
            <UiError message="No team members found." />
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <UiCard title="Add Member">
            <TeamUiAddMemberForm addMember={(userId) => add(userId)} />
          </UiCard>
        </Grid.Col>
      </Grid>
    </UiStack>
  )
}
