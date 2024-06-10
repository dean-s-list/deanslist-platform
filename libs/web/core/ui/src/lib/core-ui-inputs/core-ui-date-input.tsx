import { useRef, useState } from 'react'
import { DateInput, DateInputProps } from '@mantine/dates'
import { IconCalendarMonth } from '@tabler/icons-react'

export function CoreUiDateInput({ ...props }: DateInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <DateInput
      ref={inputRef}
      rightSection={<IconCalendarMonth onClick={() => inputRef.current?.focus() } style={{ cursor: 'pointer' }}/>}
      {...props}
    />
  )
}
