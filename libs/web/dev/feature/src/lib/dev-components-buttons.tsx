import { CoreUiButton } from '@deanslist-platform/web-core-ui'
import { UiCard, UiStack } from '@pubkey-ui/core'
import { IconPlus, IconTrash } from '@tabler/icons-react'

export function DevComponentsButtons() {
  return (
    <UiCard title="Buttons">
      <UiStack align="flex-start">
        <CoreUiButton>Add link</CoreUiButton>
        <CoreUiButton variant="light">Add link</CoreUiButton>
        <CoreUiButton iconLeft={IconPlus}>Add link</CoreUiButton>
        <CoreUiButton outline>Add link</CoreUiButton>
        <CoreUiButton color="red" outline iconLeft={IconTrash}>
          Add link
        </CoreUiButton>
      </UiStack>
    </UiCard>
  )
}
