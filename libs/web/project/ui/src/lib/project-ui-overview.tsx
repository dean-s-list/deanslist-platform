import { Project } from '@deanslist-platform/sdk'
import { CoreUiDateLabel } from '@deanslist-platform/web-core-ui'
import { TeamUiLink } from '@deanslist-platform/web-team-ui'
import { Text } from '@mantine/core'
import { UiInfoTable } from '@pubkey-ui/core'
import { ProjectUiStatusBadge } from './project-ui-status-badge'

export function ProjectUiOverview({ item }: { item: Project }) {
  return (
    <UiInfoTable
      withTableBorder
      items={[
        ['Status', <ProjectUiStatusBadge status={item.status} />],
        ['Team', item.team ? <TeamUiLink team={item.team} to={item.team.viewUrl} /> : null],
        ['Duration', item.duration ? <Text size="lg">{item.duration} weeks</Text> : 'N/A'],
        ['Start Date', item.startDate ? <CoreUiDateLabel size="lg" date={item.startDate} /> : 'N/A'],
        ['End Date', item.endDate ? <CoreUiDateLabel size="lg" date={item.endDate} /> : 'N/A'],
      ]}
    />
  )
}
