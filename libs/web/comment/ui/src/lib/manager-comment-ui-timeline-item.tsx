import { Comment, ManagerCreateRatingInput, ManagerUpdateRatingInput } from '@deanslist-platform/sdk'
import { CoreUiDebugModal } from '@deanslist-platform/web-core-ui'
import { Button, Collapse, Group, Rating as MantineRating } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { IconMessage } from '@tabler/icons-react'
import { CommentUiComment } from './comment-ui-comment'
import { ManagerCommentUiRating } from './manager-comment-ui-rating'

export function ManagerCommentUiTimelineItem({
  comment,
  createRating,
  deleteRating,
  updateRating,
}: {
  comment: Comment
  createRating: (res: ManagerCreateRatingInput) => Promise<boolean>
  deleteRating: (ratingId: string) => Promise<boolean>
  updateRating: (ratingId: string, res: ManagerUpdateRatingInput) => Promise<boolean>
}) {
  const viewUrl = comment.review?.viewUrl ?? null
  const [opened, { toggle }] = useDisclosure(false)

  return (
    <UiStack key={comment.id} gap="xs">
      <CommentUiComment
        comment={comment}
        footer={
          <UiStack>
            <UiStack>
              <ManagerCommentUiRating
                comment={comment}
                create={createRating}
                delete={deleteRating}
                update={updateRating}
              />
              <UiGroup>
                <MantineRating fractions={2} size="sm" readOnly value={comment.ratingAverage ?? 0} />
                <Group>
                  <CoreUiDebugModal data={comment} />
                  <Button variant="light" size="xs" onClick={toggle} leftSection={<IconMessage size={16} />}>
                    {opened ? 'Hide' : 'Show'} {comment.children?.length ?? 0} replies
                  </Button>
                </Group>
              </UiGroup>
            </UiStack>
            <UiGroup>
              <div />
            </UiGroup>
            <Collapse in={opened} transitionDuration={300} transitionTimingFunction="linear">
              {comment.children?.length ? (
                <UiStack ml="xl" gap="xs">
                  {comment.children.map((child) => (
                    <CommentUiComment
                      key={child.id}
                      comment={child}
                      to={viewUrl ? `${viewUrl}#comment=${comment.id}` : null}
                    />
                  ))}
                </UiStack>
              ) : null}
            </Collapse>
          </UiStack>
        }
      />
    </UiStack>
  )
}
