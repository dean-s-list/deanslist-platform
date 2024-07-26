import { FaqItemAdminCreateInput } from '@deanslist-platform/sdk'
import { CoreUiBack, CoreUiPage } from '@deanslist-platform/web-core-ui'
import { useAdminFindManyFaqItem } from '@deanslist-platform/web-faq-item-data-access'
import { AdminFaqItemUiCreateForm } from '@deanslist-platform/web-faq-item-ui'
import { toastError, UiCard } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export default function AdminFaqItemCreateFeature() {
  const navigate = useNavigate()
  const { createFaqItem } = useAdminFindManyFaqItem()

  async function submit(input: FaqItemAdminCreateInput) {
    return createFaqItem(input)
      .then((res) => {
        if (res) {
          navigate(`../${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <CoreUiPage leftAction={<CoreUiBack />} title="Create FaqItem">
      <UiCard>
        <AdminFaqItemUiCreateForm submit={submit} />
      </UiCard>
    </CoreUiPage>
  )
}
