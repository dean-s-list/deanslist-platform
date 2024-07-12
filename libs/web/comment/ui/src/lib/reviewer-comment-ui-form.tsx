import { ReviewerCreateCommentInput } from '@deanslist-platform/sdk'
import { pinkGradient } from '@deanslist-platform/web-core-ui'
import { Button, Group, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'
import { IconMessageCircle2Filled } from '@tabler/icons-react'

export function ReviewerCommentUiForm({
  cancel,
  createComment,
}: {
  cancel?: () => void
  createComment: (res: ReviewerCreateCommentInput) => Promise<boolean>
}) {
  const form = useForm<ReviewerCreateCommentInput>({
    initialValues: {
      content: '',
      reviewId: '',
    },
    validate: {
      content: (value) => {
        if (!value) return 'Content is required.'
        if (value.length < 3) return 'Content must be at least 3 characters.'
        if (value.length > 10_000) return 'Content must be less than 10_000 characters.'
      },
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => createComment({ ...values }))}>
      <UiStack>
        <Textarea required autosize minRows={2} placeholder="Write a comment..." {...form.getInputProps('content')} />
        <Group justify="flex-end">
          {cancel ? (
            <Button radius="xl" size="xs" variant="light" onClick={cancel}>
              Cancel
            </Button>
          ) : null}
          <Button
            radius="xl"
            size="xs"
            styles={{ root: { ...pinkGradient } }}
            rightSection={<IconMessageCircle2Filled size={16} />}
            type="submit"
          >
            Comment
          </Button>
        </Group>
      </UiStack>
    </form>
  )
}
