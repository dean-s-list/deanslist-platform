import { CoreUiPage, CoreUiSearchField } from '@deanslist-platform/web-core-ui'
import { useUserFindManyFaqItem } from '@deanslist-platform/web-faq-item-data-access'
import { FaqItemUiList } from '@deanslist-platform/web-faq-item-ui'
import { Group, Text } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { IconHelp } from '@tabler/icons-react'

export default function UserFaqItemListFeature() {
  const { grouped, query, setSearch } = useUserFindManyFaqItem()

  return (
    <CoreUiPage title="Frequently Asked Questions" leftAction={<IconHelp size={28} />}>
      <Group>
        <CoreUiSearchField placeholder="Search questions and answers" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : grouped?.length ? (
        grouped.map((group) => (
          <UiStack key={group.group}>
            <Text fz="xl" fw={700}>
              {group.group}
            </Text>
            {group.items.length ? <FaqItemUiList items={group.items} /> : <UiInfo message="No questions found" />}
          </UiStack>
        ))
      ) : (
        <UiInfo message="No questions found" />
      )}
    </CoreUiPage>
  )
}
