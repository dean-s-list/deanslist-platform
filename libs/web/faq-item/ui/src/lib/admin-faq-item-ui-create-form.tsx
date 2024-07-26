import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { FaqItemAdminCreateInput } from '@deanslist-platform/sdk'
import { UiStack } from '@pubkey-ui/core'

export function AdminFaqItemUiCreateForm({ submit }: { submit: (res: FaqItemAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<FaqItemAdminCreateInput>({
    initialValues: {
      question: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput required name="question" label="question" {...form.getInputProps('question')} />

        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
