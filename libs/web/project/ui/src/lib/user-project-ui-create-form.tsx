import { UserCreateProjectInput } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UserProjectUiCreateForm({ submit }: { submit: (res: UserCreateProjectInput) => Promise<boolean> }) {
  const model: UserCreateProjectInput = {
    name: '',
    teamId: '',
  }

  const fields: UiFormField<UserCreateProjectInput>[] = [
    formFieldText('name', {
      label: 'Name',
      description: 'The name of the project must be unique within the team.',
      required: true,
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserCreateProjectInput)}>
      <Group justify="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
