import type { CommunityManager } from '@deanslist-platform/sdk'
import { UiCard, UiError, UiLoader, UiStack } from '@pubkey-ui/core'
import { CommunityUiAddManagerForm } from './community-ui-add-manager-form'
import { CommunityUiManagerListItem } from './community-ui-manager-list-item'

export function CommunityUiSettingsManagers({
  isLoading,
  items,
  remove,
  toggle,
  add,
}: {
  isLoading: boolean
  items: CommunityManager[]
  remove: (id: string) => Promise<void>
  toggle: (id: string) => Promise<void>
  add: (id: string) => Promise<void>
}) {
  return (
    <UiStack maw={600}>
      <UiCard title="Add Manager">
        <CommunityUiAddManagerForm add={(userId) => add(userId)} />
      </UiCard>
      {isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <UiStack>
          {items.map((item) => (
            <CommunityUiManagerListItem
              key={item.id}
              item={item}
              remove={() => remove(item.userId)}
              toggle={() => toggle(item.userId)}
            />
          ))}
        </UiStack>
      ) : (
        <UiError message="No community managers found." />
      )}
    </UiStack>
  )
}
