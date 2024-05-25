import { Rating, UserUpdateRatingInput } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserRatingUiUpdateForm({
  submit,
  rating,
}: {
  submit: (res: UserUpdateRatingInput) => Promise<boolean>
  rating: Rating
}) {
  const model: UserUpdateRatingInput = {
    content: rating.content ?? '',
    rating: rating.rating,
  }

  const fields: UiFormField<UserUpdateRatingInput>[] = [formFieldText('content', { label: 'content' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateRatingInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
