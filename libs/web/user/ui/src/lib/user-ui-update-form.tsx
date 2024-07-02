import { Button, Group } from '@mantine/core'
import { User, UserUpdateUserInput } from '@deanslist-platform/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function UpdateUserForm({
  submit,
  user,
}: {
  submit: (res: UserUpdateUserInput) => Promise<boolean>
  user: User
}) {
  const model = {
    avatarUrl: user.avatarUrl ?? user.avatarUrl ?? '',
    developer: user.developer ?? false,
    name: user.name ?? '',
    twitter: user.twitter ?? '',
  }

  const fields: UiFormField<UserUpdateUserInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
    formFieldText('twitter', { label: 'Twitter Handle' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateUserInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
