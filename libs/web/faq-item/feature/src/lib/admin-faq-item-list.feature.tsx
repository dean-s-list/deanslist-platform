import { CoreUiBack, CoreUiDebugModal, CoreUiPage, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useAdminFindManyFaqItem } from '@deanslist-platform/web-faq-item-data-access'
import { AdminFaqItemUiTable } from '@deanslist-platform/web-faq-item-ui'
import { Button, Group } from '@mantine/core'
import { UiInfo, UiLoader } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export default function AdminFaqItemListFeature() {
  const { deleteFaqItem, items, query, setSearch } = useAdminFindManyFaqItem({})

  return (
    <CoreUiPage
      title="FaqItems"
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <CoreUiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <CoreUiSearchField placeholder="Search questions and answers" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminFaqItemUiTable
          deleteFaqItem={(faqItem) => {
            if (!window.confirm('Are you sure?')) return
            return deleteFaqItem(faqItem.id)
          }}
          faqItems={items}
        />
      ) : (
        <UiInfo message="No faqItems found" />
      )}
    </CoreUiPage>
  )
}
