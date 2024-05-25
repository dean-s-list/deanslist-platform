import { Review } from '@deanslist-platform/sdk'
import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { ReviewUiAvatar } from './review-ui-avatar'

export function ReviewUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  review,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  review?: Review
  to?: string | null
}) {
  if (!review) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <ReviewUiAvatar review={review} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {review?.name}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
