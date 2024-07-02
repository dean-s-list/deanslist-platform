import { Button, Group } from '@mantine/core'
import { User, UserUpdateUserInput } from '@deanslist-platform/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'
import { useEffect, useState } from 'react'

export function UpdateUserForm({
  submit,
  user,
}: {
  submit: (res: UserUpdateUserInput) => Promise<boolean>
  user: User
}) {
  const [model, setModel] = useState({
    avatarUrl: user.avatarUrl ?? '',
    developer: user.developer ?? false,
    name: user.name ?? '',
    twitter: user.twitter ?? '',
  })

  useEffect(() => {
    setModel({
      avatarUrl: user.avatarUrl ?? '',
      developer: user.developer ?? false,
      name: user.name ?? '',
      twitter: user.twitter ?? '',
    })
  }, [user])

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
