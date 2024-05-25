import { useUserFindUserProjectReview } from '@deanslist-platform/web-review-data-access'
import { Button, Group, Text } from '@mantine/core'
import { UiCard, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function UserProjectUserReview({ projectId }: { projectId: string }) {
  const { item, query } = useUserFindUserProjectReview({ projectId })
  return (
    <UiCard title="Your Review">
      {query.isLoading ? (
        <UiLoader />
      ) : item ? (
        <UiStack>
          <Text>Review started on {new Date(item?.createdAt ?? '0').toLocaleDateString()}</Text>
          <Button component={Link} to={item.viewUrl}>
            Open your review
          </Button>
        </UiStack>
      ) : (
        <UiStack>
          <Text>No review found.</Text>
          <Group justify="flex-end">
            <Button component={Link} to="../reviews">
              Start
            </Button>
          </Group>
        </UiStack>
      )}
    </UiCard>
  )
}
