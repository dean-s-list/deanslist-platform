import { UiStack } from '@pubkey-ui/core'
import { DevComponentsButtons } from './dev-components-buttons'
import { DevComponentsInputs } from './dev-components-inputs'

export function DevComponents() {
  return (
    <UiStack>
      <DevComponentsButtons />
      <DevComponentsInputs />
    </UiStack>
  )
}
