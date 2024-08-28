import { Comment, ReviewerCreateCommentInput } from '@deanslist-platform/sdk'
import { pinkGradient } from '@deanslist-platform/web-core-ui'
import { Button, ButtonProps, Collapse, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { ReviewerCommentUiForm } from './reviewer-comment-ui-form'

export function CommentUiFormButtons({
  comment,
  createComment,
  open = false,
  ...props
}: ButtonProps & {
  comment?: Comment
  createComment: (res: ReviewerCreateCommentInput) => Promise<boolean>
  open?: boolean
}) {
  const [opened, { toggle }] = useDisclosure(open)

  return (
    <UiStack>
      <UiGroup>
        <Text size="xl" fw={700}>
          My review
        </Text>
        <Button radius="xl" styles={{ root: { ...pinkGradient } }} {...props} onClick={() => toggle()}>
          {opened ? 'Cancel' : 'Add comment'}
        </Button>
      </UiGroup>
      <Collapse in={opened}>
        <ReviewerCommentUiForm
          label="Comment"
          description="Each point of feedback should be a separate comment."
          placeholder="Write your comment here..."
          createComment={async (res) => {
            return createComment({ ...res, parentId: comment?.id ?? undefined }).then((res) => {
              toggle()
              return res
            })
          }}
        />
      </Collapse>
    </UiStack>
  )
}
