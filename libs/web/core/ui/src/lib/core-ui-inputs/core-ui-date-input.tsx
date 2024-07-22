import { DateInput, DateInputProps } from '@mantine/dates'
import { IconCalendarMonth } from '@tabler/icons-react'
import { useRef } from 'react'
import { cardGradient } from '../core-ui-constants'

export function CoreUiDateInput({ ...props }: DateInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <DateInput
      ref={inputRef}
      styles={{ input: { border: 'none', ...cardGradient } }}
      rightSection={<IconCalendarMonth onClick={() => inputRef.current?.focus()} style={{ cursor: 'pointer' }} />}
      {...props}
    />
  )
}
