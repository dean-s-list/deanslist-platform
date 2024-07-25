import { Project } from '@deanslist-platform/sdk'
import { CoreUiCard, CoreUiDivider } from '@deanslist-platform/web-core-ui'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { IconExternalLink } from '@tabler/icons-react'
import React from 'react'
import { ProjectUiAmount } from './project-ui-amount'
import { ProjectUiDeadline } from './project-ui-deadline'
import { ProjectUiItem } from './project-ui-item'
import { ProjectUiParticipants } from './project-ui-participants'
import { ProjectUiStatusBadge } from './project-ui-status-badge'

export function ProjectUiGridItem({ project, to }: { project: Project; to: string }) {
  return (
    <CoreUiCard to={to} style={{ color: 'white' }}>
      <UiStack>
        <UiGroup align="start">
          <ProjectUiItem project={project}>
            <ProjectUiStatusBadge size="xs" status={project.status} />
          </ProjectUiItem>
          <IconExternalLink />
        </UiGroup>
        <ProjectUiAmount amount={project.amountTotalUsd} label="total" />
        <CoreUiDivider />
        <UiGroup>
          <ProjectUiDeadline project={project} />
          <ProjectUiParticipants project={project} />
        </UiGroup>
      </UiStack>
    </CoreUiCard>
  )
}
