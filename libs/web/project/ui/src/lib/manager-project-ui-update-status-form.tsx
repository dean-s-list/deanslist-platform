import { Project, ProjectStatus } from '@deanslist-platform/sdk'
import { CoreUiButton, pinkGradient } from '@deanslist-platform/web-core-ui'
import { Group, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiInfo, UiStack } from '@pubkey-ui/core'

export function ManagerProjectUiUpdateStatusForm({
  submit,
  project,
}: {
  submit: (status: ProjectStatus) => Promise<boolean>
  project: Project
}) {
  const projectMessage = project?.message
  const hasMessage = !!projectMessage?.message

  const options: { label: string; value: ProjectStatus; disabled?: boolean }[] = [
    {
      label: 'Draft',
      value: ProjectStatus.Draft,
      disabled: true,
    },
    {
      label: 'Active',
      value: ProjectStatus.Active,
      disabled: project.status !== ProjectStatus.Draft,
    },
    {
      label: 'Closed',
      value: ProjectStatus.Closed,
      disabled: project.status !== ProjectStatus.Active,
    },
  ]

  const form = useForm<{ status: ProjectStatus }>({
    initialValues: {
      status: projectMessage?.nextStatus ?? project.status ?? ProjectStatus.Draft,
    },
    validate: {},
  })

  return hasMessage ? (
    <UiInfo
      title={`Cannot transition from ${project.status} to ${projectMessage.nextStatus}`}
      message={projectMessage.message}
    />
  ) : (
    <form onSubmit={form.onSubmit((values) => submit(values.status))}>
      <UiStack>
        {}
        <Select
          allowDeselect={false}
          disabled={hasMessage}
          label="Status"
          description="The status of the project. Only Active projects can be reviewed."
          data={[...options]}
          {...form.getInputProps('status')}
        />
        <Group justify="flex-end" mt="md">
          <CoreUiButton disabled={hasMessage} styles={{ root: { ...pinkGradient } }} type="submit">
            Save changes
          </CoreUiButton>
        </Group>
      </UiStack>
    </form>
  )
}
