import { useRef, useState } from 'react'
import { DateInput, DateInputProps } from '@mantine/dates'
import { IconCalendarMonth } from '@tabler/icons-react'

export function CoreUiDateInput({ ...props }: DateInputProps) {
  const [value, setValue] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <DateInput
      ref={inputRef}
      value={props.value || value}
      onChange={props.onChange || setValue}
      rightSection={<IconCalendarMonth onClick={() => inputRef.current?.focus() } style={{ cursor: 'pointer' }}/>}
      {...props}
    />
  )
}
