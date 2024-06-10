import { CoreUiCurrencyInput, CoreUiInput, CoreUiDateInput } from '@deanslist-platform/web-core-ui'
import { UiCard, UiStack } from '@pubkey-ui/core'

export function DevComponentsInputs() {
  return (
    <UiCard title="Inputs">
      <UiStack align="flex-start">
        <CoreUiInput/>
        <CoreUiCurrencyInput currency="USDC"/>
        <CoreUiDateInput/>
      </UiStack>
    </UiCard>
  )
}
