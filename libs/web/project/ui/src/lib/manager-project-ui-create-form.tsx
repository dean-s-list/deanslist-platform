import { ManagerCreateProjectInput } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function ManagerProjectUiCreateForm({
  submit,
}: {
  submit: (res: ManagerCreateProjectInput) => Promise<boolean>
}) {
  const model: ManagerCreateProjectInput = {
    name: '',
    teamId: '',
  }

  const fields: UiFormField<ManagerCreateProjectInput>[] = [
    formFieldText('name', {
      label: 'Name',
      description: 'The name of the project must be unique within the team.',
      required: true,
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as ManagerCreateProjectInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
