import { ManagerUpdateRatingInput, Rating } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function ManagerRatingUiUpdateForm({
  submit,
  rating,
}: {
  submit: (res: ManagerUpdateRatingInput) => Promise<boolean>
  rating: Rating
}) {
  const model: ManagerUpdateRatingInput = {
    content: rating.content ?? '',
    rating: rating.rating,
  }

  const fields: UiFormField<ManagerUpdateRatingInput>[] = [formFieldText('content', { label: 'content' })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as ManagerUpdateRatingInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
