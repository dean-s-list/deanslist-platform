import { FaqItem } from '@deanslist-platform/sdk'
import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function FaqItemUiInfo({ faqItem }: { faqItem?: FaqItem }) {
  if (!faqItem) return null

  const items: UiInfoItems = [
    ['question', faqItem.question],
    ['answer', faqItem.answer],
    ['order', faqItem.order],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(faqItem.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(faqItem.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
