import { Comment, ReviewerCreateCommentInput } from '@deanslist-platform/sdk'
import { CoreUiCard, pinkGradient } from '@deanslist-platform/web-core-ui'
import { Button, ButtonProps, Collapse, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { ReviewerCommentUiForm } from './reviewer-comment-ui-form'

export function CommentUiFormButtons({
  label,
  title,
  comment,
  createComment,
  ...props
}: ButtonProps & {
  label: string
  title: string
  comment?: Comment
  createComment: (res: ReviewerCreateCommentInput) => Promise<boolean>
}) {
  const [opened, { toggle }] = useDisclosure(false)

  return (
    <UiStack>
      <UiGroup>
        <Text size="xl" fw={700}>
          My review
        </Text>
        <Button radius="xl" styles={{ root: { ...pinkGradient } }} {...props} onClick={() => toggle()}>
          {label}
        </Button>
      </UiGroup>
      <Collapse in={opened}>
        <CoreUiCard>
          <ReviewerCommentUiForm
            cancel={() => toggle()}
            createComment={async (res) => {
              return createComment({ ...res, parentId: comment?.id ?? undefined }).then((res) => {
                toggle()
                return res
              })
            }}
          />
        </CoreUiCard>
      </Collapse>
    </UiStack>
  )
}
