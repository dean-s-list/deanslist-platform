import { ReviewerCreateCommentInput } from '@deanslist-platform/sdk'
import { CoreUiButton, CoreUiEditor, pinkGradient, useCoreUiEditor } from '@deanslist-platform/web-core-ui'
import { Button, Group, Text } from '@mantine/core'
import { toastError, UiStack } from '@pubkey-ui/core'
import { IconMessageCircle2Filled } from '@tabler/icons-react'
import { useState } from 'react'

export function ReviewerCommentUiForm({
  cancel,
  createComment,
  placeholder,
  description,
}: {
  cancel?: () => void
  createComment: (res: ReviewerCreateCommentInput) => Promise<boolean>
  placeholder: string
  description?: string
}) {
  const [loading, setLoading] = useState(false)
  const { editor } = useCoreUiEditor({ content: '', placeholder })

  return (
    <UiStack>
      <CoreUiEditor editor={editor} />
      {description ? (
        <Text size="sm" c="dimmed" ta="end">
          {description}
        </Text>
      ) : null}
      <Group justify="flex-end" wrap="nowrap">
        <CoreUiButton
          loading={loading}
          size="xs"
          styles={{ root: { ...pinkGradient } }}
          rightSection={<IconMessageCircle2Filled size={16} />}
          onClick={() => {
            if (!editor.getText().length) {
              toastError('Comment cannot be empty')
              return
            }
            setLoading(true)
            createComment({ reviewId: '', content: editor.getHTML() }).then((created) => {
              if (created) {
                editor.commands.clearContent()
              }
              setLoading(false)
              return created
            })
          }}
        >
          Comment
        </CoreUiButton>
        {cancel ? (
          <Button radius="xl" size="xs" variant="light" onClick={cancel}>
            Cancel
          </Button>
        ) : null}
      </Group>
    </UiStack>
  )
}
