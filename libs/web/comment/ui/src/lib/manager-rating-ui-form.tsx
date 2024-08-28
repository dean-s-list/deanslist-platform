import { Rating, User } from '@deanslist-platform/sdk'
import { cardGradient, CoreUiRating } from '@deanslist-platform/web-core-ui'
import { UserUiAvatar } from '@deanslist-platform/web-user-ui'
import { ActionIcon, Box, Flex, Textarea, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconCheck, IconTrash } from '@tabler/icons-react'

export function ManagerRatingUiForm({
  author,
  delete: deleteRating,
  disabled = false,
  rating,
  submit,
}: {
  author?: User | null
  disabled?: boolean
  content?: string | null
  rating?: Rating
  delete?: () => Promise<boolean>
  submit: (input: { rating: number; content: string }) => Promise<boolean>
}) {
  const form = useForm<{ rating: number; content: string }>({
    initialValues: {
      content: rating?.content ?? '',
      rating: rating?.rating ?? 0,
    },
  })

  return (
    <form
      onSubmit={form.onSubmit((values) => submit({ ...values, rating: parseInt(values.rating?.toString() ?? '0') }))}
    >
      <Flex align="center" gap="xs">
        {author ? <UserUiAvatar user={author} to={author.profileUrl} size="sm" /> : <div />}
        <Textarea
          styles={{ input: { border: 'none', ...cardGradient } }}
          disabled={disabled}
          style={{ width: '100%' }}
          size="xs"
          rows={1}
          placeholder="Write a comment about the rating."
          {...form.getInputProps('content')}
        />
        <Tooltip
          label={rating ? `Rating created ${new Date(rating?.createdAt ?? '0').toLocaleString()}` : 'Rate this content'}
        >
          <Box>
            <CoreUiRating fractions={1} readOnly={disabled} {...form.getInputProps('rating')} />
          </Box>
        </Tooltip>
        {disabled ? null : (
          <ActionIcon type="submit" disabled={!form.isDirty()}>
            <IconCheck size={16} stroke={1.5} />
          </ActionIcon>
        )}
        {deleteRating ? (
          <ActionIcon color="red" variant="light" onClick={() => deleteRating()}>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        ) : null}
      </Flex>
    </form>
  )
}
