import { Group, Text } from '@mantine/core'

export function ProjectUiAmount({ amount, label }: { amount?: number | null; label: string }) {
  if (!amount) return null
  return (
    <Group gap={4} align="baseline">
      <Text size="xl" fw="bold">
        {amount} USDC
      </Text>
      {label ? (
        <Text size="md" c="dimmed">
          {label}
        </Text>
      ) : null}
    </Group>
  )
}
