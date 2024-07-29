import { FaqItemAdminCreateInput, FaqItemGroup, getEnumOptions } from '@deanslist-platform/sdk'
import { Button, Group, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'

export function AdminFaqItemUiCreateForm({ submit }: { submit: (res: FaqItemAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<FaqItemAdminCreateInput>({
    initialValues: {
      group: FaqItemGroup.Reviewer,
      question: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <Select label="Group" clearable={false} data={getEnumOptions(FaqItemGroup)} {...form.getInputProps('group')} />
        <TextInput required name="question" label="question" {...form.getInputProps('question')} />

        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
