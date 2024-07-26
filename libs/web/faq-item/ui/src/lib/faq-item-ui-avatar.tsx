import { FaqItem } from '@deanslist-platform/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type FaqItemUiAvatarProps = UiAvatarProps & {
  faqItem?: FaqItem
}

export function FaqItemUiAvatar({ faqItem, ...props }: FaqItemUiAvatarProps) {
  return <UiAvatar url={undefined} name={faqItem?.question} {...props} />
}
