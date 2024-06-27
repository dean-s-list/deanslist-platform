import type { Community } from '@deanslist-platform/sdk'
import { Divider, Group, Paper, Text } from '@mantine/core'
import { UiDebugModal, UiGroup, UiStack } from '@pubkey-ui/core'
import { IconPlayerPlay, IconUsers } from '@tabler/icons-react'
import { ComponentType } from 'react'
import { CommunityUiItem } from './community-ui-item'

export function CommunityUiGridItem({ community, to }: { community: Community; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiStack>
        <UiGroup>
          <CommunityUiItem community={community} to={to} />
          <UiDebugModal data={community} />
        </UiGroup>
        <Divider />
        <UiGroup>
          <Item icon={IconPlayerPlay} text={`${community.activeProjectsCount ?? 0} active projects`} />
          <Item icon={IconUsers} text={`${community.memberCount ?? 0} members`} />
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
