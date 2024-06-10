import { CoreUiCurrencyInput, CoreUiInput, CoreUiDateInput } from '@deanslist-platform/web-core-ui'
import { UiCard, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

export function DevComponentsInputs() {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <UiCard title="Inputs">
      <UiStack align="flex-start">
        <CoreUiInput miw={240}/>
        <CoreUiCurrencyInput miw={240} currency="USDC"/>
        <CoreUiDateInput miw={240} value={value} onChange={setValue}/>
      </UiStack>
    </UiCard>
  )
}
