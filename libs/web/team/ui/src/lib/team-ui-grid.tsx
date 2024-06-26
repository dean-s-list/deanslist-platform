import type { Team } from '@deanslist-platform/sdk'
import { CoreUiPageLimit, gridLimits } from '@deanslist-platform/web-core-ui'
import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { TeamUiGridItem } from './team-ui-grid-item'

export function TeamUiGrid({
  teams = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  teams: Team[]
  page: DataTableProps['page']
  totalRecords: number
  onPageChange: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  const totalPages = totalRecords / limit + 1
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {teams.map((team) => (
          <TeamUiGridItem key={team.id} to={team.id} team={team} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <UiDebugModal data={teams} />
          <CoreUiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
