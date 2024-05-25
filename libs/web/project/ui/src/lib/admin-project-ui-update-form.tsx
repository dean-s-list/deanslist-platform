import { AdminUpdateProjectInput, Project } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminProjectUiUpdateForm({
  submit,
  project,
}: {
  submit: (res: AdminUpdateProjectInput) => Promise<boolean>
  project: Project
}) {
  const model: AdminUpdateProjectInput = {
    teamId: project.teamId ?? '',
    name: project.name ?? '',
    avatarUrl: project.avatarUrl ?? '',
  }

  const fields: UiFormField<AdminUpdateProjectInput>[] = [
    formFieldText('teamId', {
      label: 'Team ID',
      description: 'Enter the team ID to move the project to a different team.',
    }),
    formFieldText('name', { label: 'Name', description: 'The name of the project must be unique within the team.' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateProjectInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
