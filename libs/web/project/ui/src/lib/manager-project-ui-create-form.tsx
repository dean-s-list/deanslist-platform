import { Community, ManagerCreateProjectInput } from '@deanslist-platform/sdk'
import { CoreUiButton, pinkGradient } from '@deanslist-platform/web-core-ui'
import { Checkbox, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

export function ManagerProjectUiCreateForm({
  communities,
  submit,
}: {
  communities: Community[]
  submit: (res: ManagerCreateProjectInput, addMore?: boolean) => Promise<boolean>
}) {
  const [addMore, setAddMore] = useState(false)
  const form = useForm<ManagerCreateProjectInput>({
    initialValues: {
      name: '',
      communityId: communities[0]?.id ?? '',
    },
    validate: {
      name: (value) => {
        if (!value) return 'Name is required.'
        if (value.length < 3) return 'Name must be at least 3 characters.'
        if (value.length > 50) return 'Name must be less than 50 characters.'
      },
      communityId: (value) => {
        if (!communities.some((c) => c.id === value)) {
          return 'Community not found.'
        }
      },
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        submit({ ...values }, addMore ?? false).then(() => {
          form.setFieldValue('name', '')
        }),
      )}
    >
      <UiStack>
        <UiStack>
          <Select
            data={communities?.map((item) => ({ value: item.id, label: item.name }))}
            label="Community"
            placeholder="Select community"
            description="The community where the project will be created."
            {...form.getInputProps('communityId')}
          />
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Name"
            description="The name of the project must be unique within the community."
            {...form.getInputProps('name')}
          />
          <Checkbox
            label="Add multiple projects"
            checked={addMore}
            onChange={(event) => setAddMore(event.currentTarget.checked)}
          />
        </UiStack>
        <CoreUiButton styles={{ root: { ...pinkGradient } }} type="submit">
          Add draft project
        </CoreUiButton>
      </UiStack>
    </form>
  )
}
