import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { Text } from '@mantine/core'
import { UiAnchor, UiStack } from '@pubkey-ui/core'

export function ReviewUiEmptyState({ search, username }: { search?: string; username?: string }) {
  const { user } = useAuth()

  return (
    <UiStack align="center" justify="center" gap={0}>
      <Text fz={48} c="white" ta="center">
        <span role="img" aria-label="detective">
          🕵️
        </span>
      </Text>
      <Text size="xl" c="white" ta="center">
        We couldn't find any reviews
        {search || username ? (
          <span>
            {' '}
            for <strong>{search ? search : username}</strong>
          </span>
        ) : null}
        .
      </Text>
      {user?.username === username && !search ? (
        <Text size="xl" c="white" ta="center">
          Go to the <UiAnchor to="/projects">projects</UiAnchor> page to review a project.
        </Text>
      ) : null}
    </UiStack>
  )
}
