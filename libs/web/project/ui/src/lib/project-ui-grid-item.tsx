import type { Project } from '@deanslist-platform/sdk'
import { CoreUiCard } from '@deanslist-platform/web-core-ui'
import { Divider } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { ProjectUiAmount } from './project-ui-amount'
import { ProjectUiItem } from './project-ui-item'
import { ProjectUiStatusBadge } from './project-ui-status-badge'
import { ProjectUiTags } from './project-ui-tags'
import { IconExternalLink } from '@tabler/icons-react'
import { ProjectUiParticipants } from './project-ui-participants'

export function ProjectUiGridItem({ project, to }: { project: Project; to: string }) {
  return (
    <CoreUiCard to={to}>
      <UiStack>
        <UiGroup align="start">
          <ProjectUiItem project={project} />
          <IconExternalLink />
        </UiGroup>
        <ProjectUiTags tags={project.tags} />
        <ProjectUiAmount amount={project.amountTotalUsd} label="total" />
        <Divider />
        <UiGroup>
          <ProjectUiStatusBadge status={project?.status} />
          <ProjectUiParticipants project={project} />
        </UiGroup>
      </UiStack>
    </CoreUiCard>
  )
}
