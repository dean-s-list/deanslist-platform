import { formatUsd } from '@deanslist-platform/sdk'
import { Group, Text } from '@mantine/core'

export function ProjectUiAmount({ amount, label }: { amount?: number | null; label: string }) {
  if (!amount) return null
  return (
    <Group gap={4} align="baseline">
      <Text size="xl" fw="bold">
        {formatUsd(amount)} USDC
      </Text>
      {label ? (
        <Text size="sm" fw={400}>
          {label}
        </Text>
      ) : null}
    </Group>
  )
}
