import type { Project } from '@deanslist-platform/sdk'
import { CoreUiCard } from '@deanslist-platform/web-core-ui'
import { Divider } from '@mantine/core'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { IconExternalLink } from '@tabler/icons-react'
import { ProjectUiAmount } from './project-ui-amount'
import { ProjectUiDeadline } from './project-ui-deadline'
import { ProjectUiItem } from './project-ui-item'
import { ProjectUiParticipants } from './project-ui-participants'

export function ProjectUiGridItem({ project, to }: { project: Project; to: string }) {
  return (
    <CoreUiCard to={to}>
      <UiStack>
        <UiGroup align="start">
          <ProjectUiItem project={project} />
          <IconExternalLink />
        </UiGroup>
        <ProjectUiAmount amount={project.amountTotalUsd} label="total" />
        <Divider />
        <UiGroup>
          <ProjectUiDeadline project={project} />
          <ProjectUiParticipants project={project} />
        </UiGroup>
      </UiStack>
    </CoreUiCard>
  )
}
