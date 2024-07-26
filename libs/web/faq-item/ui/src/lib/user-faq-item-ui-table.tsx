import { FaqItem } from '@deanslist-platform/sdk'
import { ScrollArea } from '@mantine/core'
import { DataTable } from 'mantine-datatable'

export function UserFaqItemUiTable({ faqItems = [] }: { faqItems: FaqItem[] }) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'question',
          },
          {
            accessor: 'answer',
          },
        ]}
        records={faqItems}
      />
    </ScrollArea>
  )
}
