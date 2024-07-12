import type { Project } from '@deanslist-platform/sdk'
import { CoreUiCard } from '@deanslist-platform/web-core-ui'
import { Text } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { ProjectUiAmount } from './project-ui-amount'
import { ProjectUiItem } from './project-ui-item'
import { ProjectUiStatusBadge } from './project-ui-status-badge'
import { ProjectUiTags } from './project-ui-tags'

export function ProjectUiGridItem({ project, to }: { project: Project; to: string }) {
  return (
    <CoreUiCard to={to}>
      <UiStack>
        <UiGroup>
          <ProjectUiItem project={project} />
        </UiGroup>
        <ProjectUiTags tags={project.tags} />
        <ProjectUiAmount amount={project.amountTotalUsd} label="total" />
        <UiGroup>
          <Text>{project.reviewCount ?? 0} participants</Text>
          <ProjectUiStatusBadge status={project?.status} />
        </UiGroup>
      </UiStack>
    </CoreUiCard>
  )
}
