import { Button, Group, Popover, Stack, Text, UnstyledButton } from '@mantine/core'
import { ComboboxItem } from '@mantine/core/lib/components/Combobox'
import { ReactNode, useState } from 'react'
import { dropdownBackground } from '../core-ui-constants'
import { CoreUiDivider } from '../core-ui-content'
import { useUiBreakpoints } from '../core-ui-theme'

export function CoreUiCustomSelect({
  label,
  value,
  data,
  onChange,
  renderOption = (value: string) => value,
  smIcon,
}: {
  label: string
  value?: string
  data: ComboboxItem[]
  onChange: (value: string) => void
  renderOption?: (value: string) => ReactNode
  smIcon?: ReactNode
}) {
  const [opened, setOpened] = useState(false)
  const { isSm } = useUiBreakpoints()
  const isResponsive = smIcon && isSm

  return (
    <Popover
      styles={{ dropdown: { ...dropdownBackground, borderRadius: 16, color: 'white' } }}
      width={!isSm ? 'target' : null}
      radius="md"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <Button
          style={{ borderColor: 'white', background: 'transparent' }}
          onClick={() => setOpened((o) => !o)}
          c="white"
          variant="outline"
          radius="xl"
        >
          {isResponsive && smIcon}
          <Group gap={10} visibleFrom={isResponsive ? 'sm' : undefined}>
            <Text size="sm" c="dimmed">
              {label}:
            </Text>
            <Text size="sm">{value ? renderOption(value) : 'Select...'}</Text>
          </Group>
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap={0}>
          {data.map((option: ComboboxItem, index: number) => (
            <div key={option.value}>
              <UnstyledButton
                w="100%"
                onClick={() => {
                  onChange(option.value)
                  setOpened(false)
                }}
              >
                <Text span size="sm">
                  {renderOption(option.value)}
                </Text>
              </UnstyledButton>
              {index !== data.length - 1 ? <CoreUiDivider /> : null}
            </div>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}
