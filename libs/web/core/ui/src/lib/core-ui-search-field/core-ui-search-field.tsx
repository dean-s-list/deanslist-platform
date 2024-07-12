import { TextInput, TextInputProps } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { cardGradient } from '../core-ui-constants'

export function CoreUiSearchField({
  placeholder = 'Search...',
  setSearch,
  searchValue = '',
  ...props
}: TextInputProps & {
  setSearch: (query: string) => void
  searchValue?: string
}) {
  const [value, setValue] = useState<string>(searchValue)

  return (
    <TextInput
      leftSection={<IconSearch size={24} />}
      size="lg"
      radius="xl"
      styles={{ input: { border: 'none', ...cardGradient } }}
      style={{ flexGrow: 1 }}
      placeholder={placeholder}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          setSearch(value.trim())
        }
      }}
      {...props}
    />
  )
}
