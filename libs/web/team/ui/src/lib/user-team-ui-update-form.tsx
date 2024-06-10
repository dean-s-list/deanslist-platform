import { DiscordServer, Team, UserUpdateTeamInput } from '@deanslist-platform/sdk'
import { Button, Fieldset, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'

export function UserTeamUiUpdateForm({
  submit,
  team,
  servers,
}: {
  submit: (res: UserUpdateTeamInput) => Promise<boolean>
  team: Team
  servers: DiscordServer[]
}) {
  const form = useForm<UserUpdateTeamInput>({
    initialValues: {
      name: team.name ?? '',
      avatarUrl: team.avatarUrl ?? '',
      homeServerId: team.homeServerId ?? '',
    },

    validate: {
      name: (value) => {
        if (!value) return 'Name is required.'
        if (value.length < 3) return 'Name must be at least 3 characters.'
        if (value.length > 100) return 'Name must be less than 100 characters.'
      },
      avatarUrl: (value) => {
        if (value && !value.startsWith('http')) return 'Avatar URL must be a valid URL.'
      },
    },
  })

  return (
    <UiStack>
      <form onSubmit={form.onSubmit((values) => submit({ ...values }))}>
        <UiStack>
          <Fieldset legend="General information">
            <UiStack>
              <TextInput
                withAsterisk
                label="Name"
                placeholder="Name"
                description="The name of the team must be unique within the team."
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Avatar URL"
                placeholder="Avatar URL"
                description="The URL of the team's avatar image. Leave blank to use the default avatar."
                {...form.getInputProps('avatarUrl')}
              />
              <Select
                data={servers?.map((server) => ({ value: server.id, label: server.name }))}
                label="Home server"
                placeholder="Select server"
                description="The Discord server where the team's automated channels will be created."
                {...form.getInputProps('homeServerId')}
              />
            </UiStack>
          </Fieldset>
          <Group justify="flex-end">
            <Button type="submit">Save</Button>
          </Group>
        </UiStack>
      </form>
    </UiStack>
  )
}
