import { Community, DiscordServer, ManagerUpdateCommunityInput } from '@deanslist-platform/sdk'
import { CoreUiCard } from '@deanslist-platform/web-core-ui'
import { Button, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'

export function ManagerCommunityUiUpdateForm({
  submit,
  community,
  servers,
}: {
  submit: (res: ManagerUpdateCommunityInput) => Promise<boolean>
  community: Community
  servers: DiscordServer[]
}) {
  const form = useForm<ManagerUpdateCommunityInput>({
    initialValues: {
      name: community.name ?? '',
      avatarUrl: community.avatarUrl ?? '',
      homeServerId: community.homeServerId ?? '',
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
          <CoreUiCard title="General information">
            <UiStack>
              <TextInput
                withAsterisk
                label="Name"
                placeholder="Name"
                description="The name of the community must be unique within the community."
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Avatar URL"
                placeholder="Avatar URL"
                description="The URL of the community's avatar image. Leave blank to use the default avatar."
                {...form.getInputProps('avatarUrl')}
              />
              <Select
                data={servers?.map((server) => ({ value: server.id, label: server.name }))}
                label="Home server"
                placeholder="Select server"
                description="The Discord server where the community's automated channels will be created."
                {...form.getInputProps('homeServerId')}
              />
            </UiStack>
          </CoreUiCard>
          <Group justify="flex-end">
            <Button type="submit">Save</Button>
          </Group>
        </UiStack>
      </form>
    </UiStack>
  )
}
