import { Text } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'

export function ProjectUiEmptyState({ search }: { search?: string }) {
  return (
    <UiStack align="center" justify="center" gap={0}>
      <Text fz={48} c="white" ta="center">
        <span role="img" aria-label="detective">
          🕵️
        </span>
      </Text>
      <Text size="xl" c="white" ta="center">
        We couldn't find any results
        {search ? (
          <span>
            {' '}
            for <strong>{search}</strong>
          </span>
        ) : null}
        .
      </Text>
      <Text size="xl" c="white" ta="center">
        Try adjusting the filters and give it another try. If you still can't find it, then it looks like we don't have
        it yet.
      </Text>
    </UiStack>
  )
}
