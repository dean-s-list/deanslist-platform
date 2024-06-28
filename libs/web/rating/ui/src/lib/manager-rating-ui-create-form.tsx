import { ManagerCreateRatingInput } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function ManagerRatingUiCreateForm({ submit }: { submit: (res: ManagerCreateRatingInput) => Promise<boolean> }) {
  const model: ManagerCreateRatingInput = {
    content: '',
    rating: 0,
    commentId: '',
  }

  const fields: UiFormField<ManagerCreateRatingInput>[] = [
    formFieldText('content', { label: 'content', required: true }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as ManagerCreateRatingInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
