import type { TeamMember } from '@deanslist-platform/sdk'
import { UiCard, UiError, UiLoader, UiStack } from '@pubkey-ui/core'
import { TeamUiAddMemberForm } from './team-ui-add-member-form'
import { TeamUiMemberListItem } from './team-ui-member-list-item'

export function TeamUiSettingsMembers({
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
    <UiStack maw={600}>
      <UiCard title="Add Member">
        <TeamUiAddMemberForm addMember={(userId) => add(userId)} />
      </UiCard>
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
    </UiStack>
  )
}
