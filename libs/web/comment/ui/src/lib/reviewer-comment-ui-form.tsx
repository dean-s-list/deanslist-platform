import { ReviewerCreateCommentInput } from '@deanslist-platform/sdk'
import { CoreUiEditor, pinkGradient, useCoreUiEditor } from '@deanslist-platform/web-core-ui'
import { Button, Group } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { IconMessageCircle2Filled } from '@tabler/icons-react'

export function ReviewerCommentUiForm({
  cancel,
  createComment,
  placeholder,
}: {
  cancel?: () => void
  createComment: (res: ReviewerCreateCommentInput) => Promise<boolean>
  placeholder: string
}) {
  const { editor } = useCoreUiEditor({ content: '', placeholder })

  return (
    <UiStack>
      <CoreUiEditor editor={editor} />
      <Group justify="flex-end" wrap="nowrap">
        <Button
          radius="xl"
          size="xs"
          styles={{ root: { ...pinkGradient } }}
          rightSection={<IconMessageCircle2Filled size={16} />}
          onClick={() => {
            createComment({ reviewId: '', content: editor.getHTML() }).then((created) => {
              if (created) {
                editor.commands.clearContent()
              }
              return created
            })
          }}
        >
          Comment
        </Button>
        {cancel ? (
          <Button radius="xl" size="xs" variant="light" onClick={cancel}>
            Cancel
          </Button>
        ) : null}
      </Group>
    </UiStack>
  )
}
