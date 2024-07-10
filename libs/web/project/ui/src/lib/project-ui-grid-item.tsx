import type { Project } from '@deanslist-platform/sdk'
import { Paper, Text } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'
import { ProjectUiAmount } from './project-ui-amount'
import { ProjectUiItem } from './project-ui-item'
import { ProjectUiStatusBadge } from './project-ui-status-badge'
import { ProjectUiTags } from './project-ui-tags'

export function ProjectUiGridItem({ project, to }: { project: Project; to: string }) {
  return (
    <Paper component={Link} to={to} withBorder p="md" radius="lg">
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
    </Paper>
  )
}
