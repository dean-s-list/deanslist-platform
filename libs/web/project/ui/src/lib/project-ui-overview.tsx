import { Project } from '@deanslist-platform/sdk'
import { CoreUiDateLabel } from '@deanslist-platform/web-core-ui'
import { Text } from '@mantine/core'
import { UiInfoTable } from '@pubkey-ui/core'

export function ProjectUiOverview({ item }: { item: Project }) {
  return (
    <UiInfoTable
      withTableBorder
      items={[
        ['Duration', item.durationDays ? <Text size="lg">{item.durationDays} days</Text> : 'N/A'],
        ['Start Date', item.startDate ? <CoreUiDateLabel size="lg" date={item.startDate} /> : 'N/A'],
        ['End Date', item.endDate ? <CoreUiDateLabel size="lg" date={item.endDate} /> : 'N/A'],
        ['Reviews', `${item.reviewCount ?? 0}`],
      ]}
    />
  )
}
