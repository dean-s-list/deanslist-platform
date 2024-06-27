import { AdminUpdateProjectInput, getEnumOptions, Project, ProjectStatus } from '@deanslist-platform/sdk'
import { Button, Fieldset, Group, NumberInput, Select, TagsInput, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'

export function AdminProjectUiUpdateForm({
  submit,
  project,
}: {
  submit: (res: AdminUpdateProjectInput) => Promise<boolean>
  project: Project
}) {
  const form = useForm<AdminUpdateProjectInput>({
    initialValues: {
      name: project.name ?? '',
      avatarUrl: project.avatarUrl ?? '',
      duration: project.duration ?? 2,
      startDate: project.startDate,
      status: project.status ?? ProjectStatus.Draft,
      tags: project.tags ?? [],
      amountManagerUsd: project.amountManagerUsd ?? 0,
      amountReferralUsd: project.amountReferralUsd ?? 0,
      amountTotalUsd: project.amountTotalUsd ?? 0,
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
      duration: (value) => {
        if (value && value < 1) return 'Duration must be at least 1 week.'
      },
      startDate: (value) => {
        if (value && new Date(value) < new Date()) return 'Start date must be in the future.'
      },
    },
  })

  return (
    <UiStack>
      <form
        onSubmit={form.onSubmit((values) =>
          submit({ ...values, duration: parseInt(values.duration?.toString() ?? '2') }),
        )}
      >
        <UiStack>
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
              <TextInput
                label="Avatar URL"
                placeholder="Avatar URL"
                description="The URL of the project's avatar image. Leave blank to use the default avatar."
                {...form.getInputProps('avatarUrl')}
              />
              <TagsInput
                maxTags={2}
                label="Tags"
                placeholder="Tags"
                description="Tags are used to categorize projects."
                {...form.getInputProps('tags')}
              />
              <Select
                label="Status"
                placeholder="Status"
                data={[...getEnumOptions(ProjectStatus)]}
                {...form.getInputProps('status')}
              />
            </UiStack>
          </Fieldset>

          <Fieldset legend="Timeline">
            <UiStack>
              <TextInput
                label="Duration"
                type="number"
                placeholder="Duration"
                description="The duration of the project in weeks."
                {...form.getInputProps('duration')}
              />
              <DateInput
                label="Start Date"
                placeholder="Start Date"
                description="The start date of the project."
                {...form.getInputProps('startDate')}
              />
            </UiStack>
          </Fieldset>

          <Fieldset legend="Amounts">
            <UiStack>
              <NumberInput
                label="Total Amount"
                placeholder="Amount of USDC managers get"
                {...form.getInputProps('amountTotalUsd')}
              />
              <NumberInput
                label="Manager Amount"
                placeholder="Amount of USDC managers get"
                {...form.getInputProps('amountManagerUsd')}
              />
              <NumberInput
                label="Referral Amount"
                placeholder="Amount of USDC the referral gets"
                {...form.getInputProps('amountReferralUsd')}
              />
            </UiStack>
          </Fieldset>
          <Group justify="flex-end" mt="md">
            <Button type="submit">Save</Button>
          </Group>
        </UiStack>
      </form>
    </UiStack>
  )
}
