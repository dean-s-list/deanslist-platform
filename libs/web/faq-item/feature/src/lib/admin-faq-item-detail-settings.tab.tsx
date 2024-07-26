import { useAdminFindOneFaqItem } from '@deanslist-platform/web-faq-item-data-access'
import { AdminFaqItemUiUpdateForm } from '@deanslist-platform/web-faq-item-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminFaqItemDetailSettingsTab({ faqItemId }: { faqItemId: string }) {
  const { item, query, updateFaqItem } = useAdminFindOneFaqItem({ faqItemId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="FaqItem not found." />
  }

  return (
    <UiCard>
      <AdminFaqItemUiUpdateForm faqItem={item} submit={updateFaqItem} />
    </UiCard>
  )
}
