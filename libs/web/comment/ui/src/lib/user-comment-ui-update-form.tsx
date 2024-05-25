import { Comment, UserUpdateCommentInput } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserCommentUiUpdateForm({
  submit,
  comment,
}: {
  submit: (res: UserUpdateCommentInput) => Promise<boolean>
  comment: Comment
}) {
  const model: UserUpdateCommentInput = {
    content: comment.content ?? '',
  }

  const fields: UiFormField<UserUpdateCommentInput>[] = [formFieldText('content', { label: 'Content' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateCommentInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
