import { AdminUpdateCommunityInput, Community } from '@deanslist-platform/sdk'
import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkey-ui/core'

export function AdminCommunityUiUpdateForm({
  submit,
  community,
}: {
  submit: (res: AdminUpdateCommunityInput) => Promise<boolean>
  community: Community
}) {
  const model: AdminUpdateCommunityInput = {
    name: community.name ?? '',
    avatarUrl: community.avatarUrl ?? '',
  }

  const fields: UiFormField<AdminUpdateCommunityInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateCommunityInput)}>
      <Group justify="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
