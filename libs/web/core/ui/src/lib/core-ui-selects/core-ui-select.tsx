import { Select, SelectProps } from '@mantine/core'
import { CoreUiSelectIcon } from './core-ui-select-icon'

export function CoreUiSelect({ ...props }: SelectProps) {
  return <Select rightSection={<CoreUiSelectIcon />} {...props} />
}
