import { MultiSelect, MultiSelectProps } from '@mantine/core'
import { CoreUiSelectIcon } from './core-ui-select-icon'

export function CoreUiMultiSelect({ ...props }: MultiSelectProps) {
  return <MultiSelect rightSection={<CoreUiSelectIcon />} {...props} />
}
