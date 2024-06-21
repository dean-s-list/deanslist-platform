import { Checkbox, CheckboxProps } from '@mantine/core'

export interface CoreUiCheckboxProps extends CheckboxProps {
  onCheck?: (checked: boolean) => void
}

export function CoreUiCheckbox({ onCheck, ...props }: CoreUiCheckboxProps) {
  return <Checkbox onChange={(event) => onCheck && onCheck(event.currentTarget.checked)} {...props} />
}
