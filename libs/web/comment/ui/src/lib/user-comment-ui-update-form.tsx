import { Comment, ReviewerUpdateCommentInput } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserCommentUiUpdateForm({
  submit,
  comment,
}: {
  submit: (res: ReviewerUpdateCommentInput) => Promise<boolean>
  comment: Comment
}) {
  const model: ReviewerUpdateCommentInput = {
    content: comment.content ?? '',
  }

  const fields: UiFormField<ReviewerUpdateCommentInput>[] = [formFieldText('content', { label: 'Content' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as ReviewerUpdateCommentInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
