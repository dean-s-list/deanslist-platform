import { ManagerCreateTeamInput } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function ManagerTeamUiCreateForm({ submit }: { submit: (res: ManagerCreateTeamInput) => Promise<boolean> }) {
  const model: ManagerCreateTeamInput = {
    name: '',
  }

  const fields: UiFormField<ManagerCreateTeamInput>[] = [formFieldText('name', { label: 'name', required: true })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as ManagerCreateTeamInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
