import { CoreUiSelect, CoreUiMultiSelect, CoreUiCheckbox } from '@deanslist-platform/web-core-ui'
import { UiCard, UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

export function DevComponentsSelects() {
  const [value, setValue] = useState<string[]>([]);
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <UiCard title="Selects">
      <UiStack align="flex-start">
        <CoreUiCheckbox miw={240} label="I agree to the terms." checked={checked} onCheck={setChecked}/>
        <CoreUiSelect miw={240} data={["SOL", "USDC", "Deans Token"]}/>
        <CoreUiMultiSelect miw={240} data={["SOL", "USDC", "Deans Token"]} value={value} onChange={setValue}/>
      </UiStack>
    </UiCard>
  )
}
