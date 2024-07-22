import { TextInput, TextInputProps } from '@mantine/core'
import { cardGradient } from '../core-ui-constants'

export function CoreUiInput({ ...props }: TextInputProps) {
  return <TextInput styles={{ input: { border: 'none', ...cardGradient } }} {...props} />
}
