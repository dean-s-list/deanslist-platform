import { UserCreateTeamInput } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserTeamUiCreateForm({ submit }: { submit: (res: UserCreateTeamInput) => Promise<boolean> }) {
  const model: UserCreateTeamInput = {
    name: '',
  }

  const fields: UiFormField<UserCreateTeamInput>[] = [formFieldText('name', { label: 'name', required: true })]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateTeamInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
