import { UiStack } from '@pubkey-ui/core'
import { DevComponentsButtons } from './dev-components-buttons'
import { DevComponentsInputs } from './dev-components-inputs'
import { DevComponentsSelects } from './dev-components-selects'

export function DevComponents() {
  return (
    <UiStack>
      <DevComponentsButtons />
      <DevComponentsInputs />
      <DevComponentsSelects />
    </UiStack>
  )
}
