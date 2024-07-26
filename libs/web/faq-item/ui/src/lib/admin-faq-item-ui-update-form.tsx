import { FaqItem, FaqItemAdminUpdateInput } from '@deanslist-platform/sdk'
import { CoreUiButton, CoreUiEditor, CoreUiInput, useCoreUiEditor } from '@deanslist-platform/web-core-ui'
import { Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'

export function AdminFaqItemUiUpdateForm({
  submit,
  faqItem,
}: {
  submit: (faqItemId: string, res: FaqItemAdminUpdateInput) => Promise<boolean>
  faqItem: FaqItem
}) {
  const form = useForm<FaqItemAdminUpdateInput>({
    initialValues: {
      question: faqItem.question ?? '',
      answer: faqItem.answer ?? '',
      order: faqItem.order ?? 0,
    },
  })

  const { editor } = useCoreUiEditor({
    content: faqItem.answer ?? '',
    placeholder: 'Write the answer here...',
    onUpdate: (value) => form.setFieldValue('answer', value.editor.getHTML()),
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(faqItem.id, values))}>
      <UiStack>
        <CoreUiInput name="question" label="Question" {...form.getInputProps('question')} />
        <CoreUiInput type="number" name="order" label="Order" {...form.getInputProps('order')} />
        <CoreUiEditor editor={editor} />
        <Group justify="right">
          <CoreUiButton type="submit">Save</CoreUiButton>
        </Group>
      </UiStack>
    </form>
  )
}
