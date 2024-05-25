import { Rating } from '@deanslist-platform/sdk'
import { AvatarProps, Group, type GroupProps, Stack, Text } from '@mantine/core'
import { UiAnchor, type UiAnchorProps } from '@pubkey-ui/core'
import { RatingUiAvatar } from './rating-ui-avatar'

export function RatingUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  rating,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  rating?: Rating
  to?: string | null
}) {
  if (!rating) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <RatingUiAvatar rating={rating} {...avatarProps} />
        <Stack gap={1}>
          <Text size="sm" fw={500}>
            {rating?.content}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
