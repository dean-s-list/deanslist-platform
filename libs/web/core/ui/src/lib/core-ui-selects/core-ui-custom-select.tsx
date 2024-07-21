import { Button, Divider, Group, Popover, Stack, Text, UnstyledButton } from '@mantine/core'
import { ComboboxItem } from '@mantine/core/lib/components/Combobox'
import { ReactNode, useState } from 'react'
import { dropdownBackground, dropdownDivider } from '../core-ui-constants'
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
  value: string
  data: Array<string | ComboboxItem>
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
            <Text size="sm">{renderOption(value)}</Text>
          </Group>
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap={0}>
          {data.map((option: string | ComboboxItem, index: number) => {
            const optionValue = typeof option === 'string' ? option : option.value
            return (
              <div key={optionValue}>
                <UnstyledButton onClick={() => onChange(optionValue)} p={0}>
                  <Text span size="sm">
                    {renderOption(optionValue)}
                  </Text>
                </UnstyledButton>
                {index !== data.length - 1 ? <Divider style={{ ...dropdownDivider }} /> : null}
              </div>
            )
          })}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}
