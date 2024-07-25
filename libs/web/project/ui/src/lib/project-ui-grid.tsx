import type { Project } from '@deanslist-platform/sdk'
import { CoreUiDebugModal, CoreUiPageLimit, gridLimits } from '@deanslist-platform/web-core-ui'
import { Group, Pagination, SimpleGrid } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { DataTableProps } from 'mantine-datatable'
import { ProjectUiGridItem } from './project-ui-grid-item'

export function ProjectUiGrid({
  projects = [],
  onPageChange,
  page,
  totalPages,
  limit,
  setLimit,
  setPage,
}: {
  projects: Project[]
  page: DataTableProps['page']
  totalPages: number
  onPageChange: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, sm: 2, xl: 3 }} spacing="md">
        {projects.map((project) => (
          <ProjectUiGridItem key={project.id} to={`./${project.id}`} project={project} />
        ))}
      </SimpleGrid>
      <UiGroup>
        <Pagination disabled={totalPages < 2} total={totalPages} value={page} onChange={onPageChange} />
        <Group>
          <CoreUiDebugModal data={projects} />
          <CoreUiPageLimit data={gridLimits} limit={limit} setLimit={setLimit} setPage={setPage} />
        </Group>
      </UiGroup>
    </UiStack>
  )
}
