import { Project, ProjectStatus } from '@deanslist-platform/sdk'
import { Group, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRef } from 'react'

export function AdminProjectUiStatusSelect({
  submit,
  project,
}: {
  submit: (status: ProjectStatus) => Promise<boolean>
  project: Project
}) {
  const formRef = useRef<HTMLFormElement>(null)

  const options: { label: string; value: ProjectStatus; disabled?: boolean }[] = [
    { label: 'Draft', value: ProjectStatus.Draft },
    { label: 'Active', value: ProjectStatus.Active },
    { label: 'Closed', value: ProjectStatus.Closed },
  ]

  const form = useForm<{ status: ProjectStatus }>({
    initialValues: {
      status: project.status ?? ProjectStatus.Draft,
    },
    onValuesChange: async (values) => {
      await submit(values.status)
    },
  })

  return (
    <Group align="center">
      <form ref={formRef}>
        <Select w={100} radius="md" allowDeselect={false} data={[...options]} {...form.getInputProps('status')} />
      </form>
    </Group>
  )
}
