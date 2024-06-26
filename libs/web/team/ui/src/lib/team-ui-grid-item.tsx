import type { Team } from '@deanslist-platform/sdk'
import { Divider, Group, Paper, Text } from '@mantine/core'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { IconPlayerPlay, IconUsers } from '@tabler/icons-react'
import { ComponentType } from 'react'
import { TeamUiItem } from './team-ui-item'

export function TeamUiGridItem({ team, to }: { team: Team; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiStack>
        <UiGroup>
          <TeamUiItem team={team} to={to} />
          <UiDebugModal data={team} />
        </UiGroup>
        <Divider />
        <UiGroup>
          <Item icon={IconPlayerPlay} text={`${team.activeProjectsCount ?? 0} active projects`} />
          <Item icon={IconUsers} text={`${team.memberCount ?? 0} members`} />
        </UiGroup>
      </UiStack>
    </Paper>
  )
}

function Item({ text, icon: Icon }: { text: string; icon: ComponentType<{ size: number }> }) {
  return (
    <Group gap="xs">
      <Icon size={16} />
      <Text span size="sm">
        {text}
      </Text>
    </Group>
  )
}
