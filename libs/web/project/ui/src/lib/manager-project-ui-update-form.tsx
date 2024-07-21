import { getEnumOptions, ManagerUpdateProjectInput, Project, ProjectStatus } from '@deanslist-platform/sdk'
import { Button, Fieldset, Group, Select, SimpleGrid, Textarea, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'

export function ManagerProjectUiUpdateForm({
  submit,
  project,
}: {
  submit: (res: ManagerUpdateProjectInput) => Promise<boolean>
  project: Project
}) {
  const form = useForm<ManagerUpdateProjectInput>({
    initialValues: {
      avatarUrl: project.avatarUrl ?? '',
      durationDays: project.durationDays ?? 7,
      instructions: project.instructions ?? '',
      linkDiscord: project.linkDiscord ?? '',
      linkGithub: project.linkGithub ?? '',
      linkTelegram: project.linkTelegram ?? '',
      linkTwitter: project.linkTwitter ?? '',
      linkWebsite: project.linkWebsite ?? '',
      name: project.name ?? '',
      startDate: new Date(project.startDate ?? new Date()),
      status: project.status ?? ProjectStatus.Draft,
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
      durationDays: (value) => {
        if (value && value < 1) return 'Duration must be at least 1 day.'
      },
      startDate: (value) => {
        if (!value) return
        if (value && new Date(value ?? new Date()).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))
          return 'Start date must be in the future.'
      },
    },
  })

  return (
    <UiStack>
      <form
        onSubmit={form.onSubmit((values) =>
          submit({ ...values, durationDays: parseInt(values.durationDays?.toString() ?? '2') }),
        )}
      >
        <UiStack>
          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <Fieldset legend="General information">
              <UiStack>
                <TextInput
                  withAsterisk
                  label="Slug"
                  description="The slug is a unique identifier for the project and cannot be changed."
                  disabled
                  defaultValue={project.slug}
                />
                <TextInput
                  withAsterisk
                  label="Name"
                  placeholder="Name"
                  description="The name of the project must be unique within the community."
                  {...form.getInputProps('name')}
                />
                <Select
                  label="Status"
                  placeholder="Status"
                  description="The status of the project. Only Active projects can be reviewed."
                  data={[...getEnumOptions(ProjectStatus)]}
                  {...form.getInputProps('status')}
                />
                <Textarea
                  withAsterisk
                  rows={5}
                  autosize
                  label="Instructions"
                  placeholder="Write instructions for the project. You can use markdown."
                  description="The instructions for the project."
                  {...form.getInputProps('instructions')}
                />
              </UiStack>
            </Fieldset>
            <Fieldset legend="Links">
              <UiStack>
                <TextInput
                  label="Avatar URL"
                  placeholder="Avatar URL"
                  description="The URL of the project's avatar image. Leave blank to use the default avatar."
                  {...form.getInputProps('avatarUrl')}
                />
                <TextInput
                  label="Discord"
                  placeholder="Discord link"
                  description="Link to an invite to the Discord server."
                  {...form.getInputProps('linkDiscord')}
                />
                <TextInput
                  label="Github"
                  description="Link to the project's Github repository."
                  placeholder="Github link"
                  {...form.getInputProps('linkGithub')}
                />
                <TextInput
                  label="Telegram"
                  description="Link to the project's Telegram channel."
                  placeholder="Telegram link"
                  {...form.getInputProps('linkTelegram')}
                />
                <TextInput
                  label="X"
                  description="Link to the project's X (formerly Twitter) channel."
                  placeholder="Twitter link"
                  {...form.getInputProps('linkTwitter')}
                />
                <TextInput
                  label="Website"
                  description="Link to the project's website."
                  placeholder="Website link"
                  {...form.getInputProps('linkWebsite')}
                />
              </UiStack>
            </Fieldset>

            <Fieldset legend="Timeline">
              <UiStack>
                <DateInput
                  label="Start Date"
                  placeholder="Start Date"
                  description="The start date of the project. The end date will be calculated based on the duration."
                  minDate={new Date()}
                  {...form.getInputProps('startDate')}
                />
                <TextInput
                  label="Duration"
                  type="number"
                  placeholder="Duration"
                  description="The duration of the project in days."
                  {...form.getInputProps('durationDays')}
                />
              </UiStack>
            </Fieldset>
          </SimpleGrid>
          <Group justify="flex-end" mt="md">
            <Button type="submit">Save</Button>
          </Group>
        </UiStack>
      </form>
    </UiStack>
  )
}
