import { Button, Group, Popover, SelectProps, Stack, Text } from '@mantine/core'
import { ComboboxItem } from '@mantine/core/lib/components/Combobox'
import { IconCheck, IconSelector } from '@tabler/icons-react'
import { ReactNode, useState } from 'react'
import { cardGradient } from '../core-ui-constants'
import { useUiBreakpoints } from '../core-ui-theme'

export function CoreUiCustomSelect({
  label,
  value,
  data,
  onChange,
  renderOption = (value: string) => value,
  smIcon,
}: SelectProps & {
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
    <Popover width={!isSm ? 'target' : null} radius="md" opened={opened} onChange={setOpened}>
      <Popover.Target>
        <Button
          style={{
            borderColor: 'white',
            ...cardGradient,
          }}
          onClick={() => setOpened((o) => !o)}
          c="white"
          variant="outline"
          radius="xl"
          rightSection={!isResponsive && <IconSelector size={16} color="gray" />}
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
        <Stack gap={4}>
          {data.map((option: string | ComboboxItem) => {
            const optionValue = typeof option === 'string' ? option : option.value
            return (
              <Button
                c="gray"
                size="xs"
                key={optionValue}
                justify="left"
                variant="transparent"
                onClick={() => onChange(optionValue)}
                p={0}
                leftSection={value === optionValue ? <IconCheck size={16} color="gray" /> : null}
              >
                {renderOption(optionValue)}
              </Button>
            )
          })}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}
