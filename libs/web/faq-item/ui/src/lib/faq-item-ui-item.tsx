import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { FaqItem } from '@deanslist-platform/sdk'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { FaqItemUiAvatar } from './faq-item-ui-avatar'

export function FaqItemUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  faqItem,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  faqItem?: FaqItem
  to?: string | null
}) {
  if (!faqItem) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <FaqItemUiAvatar faqItem={faqItem} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {faqItem?.question}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
