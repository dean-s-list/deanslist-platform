import type { CommunityMember } from '@deanslist-platform/sdk'
import { UiCard, UiError, UiLoader, UiStack } from '@pubkey-ui/core'
import { CommunityUiAddMemberForm } from './community-ui-add-member-form'
import { CommunityUiMemberListItem } from './community-ui-member-list-item'

export function CommunityUiSettingsMembers({
  isLoading,
  items,
  remove,
  toggle,
  add,
}: {
  isLoading: boolean
  items: CommunityMember[]
  remove: (id: string) => Promise<void>
  toggle: (id: string) => Promise<void>
  add: (id: string) => Promise<void>
}) {
  return (
    <UiStack maw={600}>
      <UiCard title="Add Member">
        <CommunityUiAddMemberForm addMember={(userId) => add(userId)} />
      </UiCard>
      {isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UiStack>
          {items.map((item) => (
            <CommunityUiMemberListItem
              key={item.id}
              item={item}
              remove={() => remove(item.userId)}
              toggle={() => toggle(item.userId)}
            />
          ))}
        </UiStack>
      ) : (
        <UiError message="No community members found." />
      )}
    </UiStack>
  )
}
