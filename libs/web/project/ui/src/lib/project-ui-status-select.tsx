import { Project, ProjectStatus } from '@deanslist-platform/sdk'
import { Group, Select, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRef } from 'react'

export function ProjectUiStatusSelect({
  submit,
  project,
}: {
  submit: (status: ProjectStatus) => Promise<boolean>
  project: Project
}) {
  const formRef = useRef<HTMLFormElement>(null)
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

  return (
    <Tooltip
      label={
        hasMessage
          ? `Cannot transition from ${project.status} to ${projectMessage?.nextStatus}: ${projectMessage?.message}`
          : `Next status: ${projectMessage?.nextStatus}`
      }
      withArrow
      position="top"
    >
      <Group align="center">
        <form onSubmit={form.onSubmit((values) => submit(projectMessage?.nextStatus ?? values.status))} ref={formRef}>
          <Select
            w={100}
            radius="md"
            allowDeselect={false}
            disabled={hasMessage}
            data={[...options]}
            {...form.getInputProps('status')}
            onChange={() => formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }))}
          />
        </form>
      </Group>
    </Tooltip>
  )
}
