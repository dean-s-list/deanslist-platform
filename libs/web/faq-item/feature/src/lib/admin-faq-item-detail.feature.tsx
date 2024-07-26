import { CoreUiBack, CoreUiDebugModal, CoreUiPage } from '@deanslist-platform/web-core-ui'
import { useAdminFindOneFaqItem } from '@deanslist-platform/web-faq-item-data-access'
import { AdminFaqItemUiUpdateForm, FaqItemUiItem } from '@deanslist-platform/web-faq-item-ui'
import { Group } from '@mantine/core'
import { UiError, UiLoader } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'

export default function AdminFaqItemDetailFeature() {
  const { faqItemId } = useParams<{ faqItemId: string }>() as { faqItemId: string }
  const { item, query, updateFaqItem } = useAdminFindOneFaqItem({ faqItemId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="FaqItem not found." />
  }

  return (
    <CoreUiPage
      title={<FaqItemUiItem faqItem={item} />}
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <CoreUiDebugModal data={item} />
        </Group>
      }
    >
      <AdminFaqItemUiUpdateForm faqItem={item} submit={updateFaqItem} />
    </CoreUiPage>
  )
}
