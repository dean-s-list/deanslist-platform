import { UserCreateCommentInput } from '@deanslist-platform/sdk'
import { Button, Group, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'

export function UserCommentUiForm({
  cancel,
  createComment,
}: {
  cancel?: () => void
  createComment: (res: UserCreateCommentInput) => Promise<boolean>
}) {
  const form = useForm<UserCreateCommentInput>({
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
            <Button variant="light" onClick={cancel}>
              Cancel
            </Button>
          ) : null}
          <Button type="submit">Comment</Button>
        </Group>
      </UiStack>
    </form>
  )
}
