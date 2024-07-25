import { Community } from '@deanslist-platform/sdk'
import { CoreUiDebugModal, CoreUiPageLimit, gridLimits } from '@deanslist-platform/web-core-ui'
import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { CommunityUiGridItem } from './community-ui-grid-item'

export function CommunityUiGrid({
  communities = [],
  onPageChange,
  page,
  totalRecords,
  limit,
  setLimit,
  setPage,
}: {
  communities: Community[]
  page: DataTableProps['page']
  totalRecords: number
  onPageChange: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  const totalPages = totalRecords / limit
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {communities.map((community) => (
          <CommunityUiGridItem key={community.id} to={community.id} community={community} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <CoreUiDebugModal data={communities} />
          <CoreUiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
