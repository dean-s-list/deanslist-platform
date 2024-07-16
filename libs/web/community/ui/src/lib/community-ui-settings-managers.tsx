import type { CommunityManager } from '@deanslist-platform/sdk'
import { CoreUiCard } from '@deanslist-platform/web-core-ui'
import { UiError, UiLoader, UiStack } from '@pubkey-ui/core'
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
      <CoreUiCard title="Add Manager">
        <CommunityUiAddManagerForm add={(userId) => add(userId)} />
      </CoreUiCard>
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
