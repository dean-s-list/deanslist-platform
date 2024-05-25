import { Group, Text, TextProps } from '@mantine/core'
import { UiTime } from '@pubkey-ui/core'

export function CoreUiDateLabel({ date, ...props }: TextProps & { date: Date }) {
  const d = new Date(date)
  return (
    <Group gap="xs">
      <Text {...props}>{d.toDateString()}</Text>
      <UiTime c="dimmed" {...props} date={d} />
    </Group>
  )
}
