import { UserCreateRatingInput } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserRatingUiCreateForm({ submit }: { submit: (res: UserCreateRatingInput) => Promise<boolean> }) {
  const model: UserCreateRatingInput = {
    content: '',
    rating: 0,
    commentId: '',
  }

  const fields: UiFormField<UserCreateRatingInput>[] = [formFieldText('content', { label: 'content', required: true })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateRatingInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
