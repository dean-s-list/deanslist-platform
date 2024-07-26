import { useAdminFindOneFaqItem } from '@deanslist-platform/web-faq-item-data-access'
import { FaqItemUiInfo } from '@deanslist-platform/web-faq-item-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminFaqItemDetailInfoTab({ faqItemId }: { faqItemId: string }) {
  const { item, query } = useAdminFindOneFaqItem({ faqItemId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="FaqItem not found." />
  }

  return (
    <UiCard>
      <FaqItemUiInfo faqItem={item} />
    </UiCard>
  )
}
