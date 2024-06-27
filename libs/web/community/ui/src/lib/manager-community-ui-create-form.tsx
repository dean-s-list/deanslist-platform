import { ManagerCreateCommunityInput } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function ManagerCommunityUiCreateForm({
  submit,
}: {
  submit: (res: ManagerCreateCommunityInput) => Promise<boolean>
}) {
  const model: ManagerCreateCommunityInput = {
    name: '',
  }

  const fields: UiFormField<ManagerCreateCommunityInput>[] = [formFieldText('name', { label: 'name', required: true })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as ManagerCreateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
