import { CoreUiCurrencyInput, CoreUiInput, CoreUiDateInput } from '@deanslist-platform/web-core-ui'
import { UiCard, UiStack } from '@pubkey-ui/core'

export function DevComponentsInputs() {
  return (
    <UiCard title="Inputs">
      <UiStack align="flex-start">
        <CoreUiInput miw={240}/>
        <CoreUiCurrencyInput miw={240} currency="USDC"/>
        <CoreUiDateInput miw={240}/>
      </UiStack>
    </UiCard>
  )
}
