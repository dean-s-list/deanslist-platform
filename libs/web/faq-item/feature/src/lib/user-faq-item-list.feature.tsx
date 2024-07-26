import { CoreUiPage, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useUserFindManyFaqItem } from '@deanslist-platform/web-faq-item-data-access'
import { FaqItemUiList } from '@deanslist-platform/web-faq-item-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader } from '@pubkey-ui/core'
import { IconHelp } from '@tabler/icons-react'

export default function UserFaqItemListFeature() {
  const { items, query, setSearch } = useUserFindManyFaqItem()

  return (
    <CoreUiPage title="Frequently Asked Questions" leftAction={<IconHelp size={28} />}>
      <Group>
        <CoreUiSearchField placeholder="Search questions and answers" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <FaqItemUiList items={items} />
      ) : (
        <UiInfo message="No faqItems found" />
      )}
    </CoreUiPage>
  )
}
