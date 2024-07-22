import { useFaqItems } from '@deanslist-platform/web-faq-data-access'
import { FaqUiItems } from '@deanslist-platform/web-faq-ui'
import { UiPage } from '@pubkey-ui/core'
import { IconHelp } from '@tabler/icons-react'

export default function FaqFeature() {
  const { faqs } = useFaqItems()
  return (
    <UiPage title="Frequently Asked Questions" leftAction={<IconHelp size={28} />}>
      <FaqUiItems faqs={faqs} />
    </UiPage>
  )
}
