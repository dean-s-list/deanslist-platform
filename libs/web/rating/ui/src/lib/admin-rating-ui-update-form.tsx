import { AdminUpdateRatingInput, Rating } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminRatingUiUpdateForm({
  submit,
  rating,
}: {
  submit: (res: AdminUpdateRatingInput) => Promise<boolean>
  rating: Rating
}) {
  const model: AdminUpdateRatingInput = {
    content: rating.content ?? '',
    rating: rating.rating,
  }

  const fields: UiFormField<AdminUpdateRatingInput>[] = [formFieldText('content', { label: 'content' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateRatingInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
