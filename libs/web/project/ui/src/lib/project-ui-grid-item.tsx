import type { Project } from '@deanslist-platform/sdk'
import { Paper } from '@mantine/core'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { ProjectUiAmount } from './project-ui-amount'
import { ProjectUiItem } from './project-ui-item'
import { ProjectUiStatusBadge } from './project-ui-status-badge'
import { ProjectUiTags } from './project-ui-tags'

export function ProjectUiGridItem({ project, to }: { project: Project; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiStack>
        <UiGroup>
          <ProjectUiItem project={project} to={to} />
          <UiDebugModal data={project} />
        </UiGroup>
        <ProjectUiTags tags={project.tags} />
        <ProjectUiAmount amount={project.amountTotalUsd} label="total" />
        <UiGroup>
          <div></div>
          <ProjectUiStatusBadge status={project?.status} />
        </UiGroup>
      </UiStack>
    </Paper>
  )
}
