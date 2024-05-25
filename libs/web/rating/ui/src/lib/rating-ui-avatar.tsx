import { Rating } from '@deanslist-platform/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type RatingUiAvatarProps = UiAvatarProps & {
  rating?: Rating
}

export function RatingUiAvatar({ rating, ...props }: RatingUiAvatarProps) {
  return <UiAvatar url={undefined} name={rating?.content} {...props} />
}
