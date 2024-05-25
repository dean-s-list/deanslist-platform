import { AdminUpdateTeamInput, Team } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminTeamUiUpdateForm({
  submit,
  team,
}: {
  submit: (res: AdminUpdateTeamInput) => Promise<boolean>
  team: Team
}) {
  const model: AdminUpdateTeamInput = {
    name: team.name ?? '',
    avatarUrl: team.avatarUrl ?? '',
  }

  const fields: UiFormField<AdminUpdateTeamInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateTeamInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
