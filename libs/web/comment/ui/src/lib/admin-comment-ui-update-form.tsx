import { AdminUpdateCommentInput, Comment } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminCommentUiUpdateForm({
  submit,
  comment,
}: {
  submit: (res: AdminUpdateCommentInput) => Promise<boolean>
  comment: Comment
}) {
  const model: AdminUpdateCommentInput = {
    content: comment.content ?? '',
  }

  const fields: UiFormField<AdminUpdateCommentInput>[] = [formFieldText('content', { label: 'content' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateCommentInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
